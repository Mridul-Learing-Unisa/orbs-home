import { useEffect } from 'react';
import type { RefObject } from 'react';

/** How quickly each signal catches up with its target per frame (0–1). Lower = more glide. */
const SCROLL_EASE = 0.08;
const VELOCITY_EASE = 0.08;
const POINTER_EASE = 0.06;
/** Scroll speed (px per frame) that counts as "full energy". */
const FULL_SPEED = 45;
/** Skip style writes for changes smaller than this. */
const EPSILON = 0.0005;

/**
 * Drives the ambient light field. Each frame it writes a few smoothed values to
 * CSS variables on `ref`, and Backdrop.css turns them into per-orb motion:
 *
 *  --p    scroll progress through the page, 0–1 (eased, so it glides)
 *  --vel  scroll energy, 0–1 (rises while scrolling fast, settles when you stop)
 *  --mx, --my  pointer position, -1–1 from the centre (fine pointers only)
 *
 * With reduced motion requested, nothing runs and the field stays still.
 */
export function useAmbientMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const trackPointer = window.matchMedia('(pointer: fine)').matches;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    let p = progress();
    let vel = 0;
    let mx = 0;
    let my = 0;
    let targetMx = 0;
    let targetMy = 0;
    let lastY = window.scrollY;
    const written = { p: NaN, vel: NaN, mx: NaN, my: NaN };

    const write = (key: keyof typeof written, value: number) => {
      if (Math.abs(value - written[key]) < EPSILON) return;
      written[key] = value;
      el.style.setProperty(`--${key}`, value.toFixed(4));
    };

    const onPointer = (e: PointerEvent) => {
      targetMx = (e.clientX / window.innerWidth) * 2 - 1;
      targetMy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (trackPointer) window.addEventListener('pointermove', onPointer, { passive: true });

    let frame = 0;
    const loop = () => {
      const y = window.scrollY;
      const speed = Math.min(1, Math.abs(y - lastY) / FULL_SPEED);
      lastY = y;

      p += (progress() - p) * SCROLL_EASE;
      vel += (speed - vel) * VELOCITY_EASE;
      mx += (targetMx - mx) * POINTER_EASE;
      my += (targetMy - my) * POINTER_EASE;

      write('p', p);
      write('vel', vel);
      write('mx', mx);
      write('my', my);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [ref]);
}
