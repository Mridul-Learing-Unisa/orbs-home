import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Slide in once the sidebar's top rises above this fraction of the viewport. */
const ENTER_AT = 0.8;
/** Slide out once the sidebar's top passes above this fraction of the viewport… */
const EXIT_AT = 0.12;
/** …by this many px. */
const EXIT_LEAD = 24;
/** Sub-pixel slack when comparing edges. */
const EPSILON = 1;

/**
 * Visibility for a sidebar that sits beside some content: it slides in as it
 * arrives and slides back out as it starts to leave the top of the screen.
 *
 * As a safeguard, it also hides the moment the content starts pulling away from
 * it (only possible if the sidebar is ever made sticky), so the two are never
 * visibly out of step.
 */
export function useSidebarReveal(
  ref: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      // Transforms here are horizontal only, so vertical positions are exact.
      const side = el.getBoundingClientRect();
      const main = content.getBoundingClientRect();

      const arrived = side.top < vh * ENTER_AT;
      const leavingTop = side.top < vh * EXIT_AT - EXIT_LEAD;
      const contentPullingAway = main.top < side.top - EPSILON && main.bottom < side.bottom - EPSILON;

      setShown(arrived && !leavingTop && !contentPullingAway);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(content);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, contentRef]);

  return shown;
}
