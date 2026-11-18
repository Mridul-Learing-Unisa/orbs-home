import { useEffect } from 'react';
import type { RefObject } from 'react';
import { prefersRichMotion } from './motion';

/** Pulls an element gently toward the pointer while hovered. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !prefersRichMotion()) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * strength;
      const dy = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, strength]);
}
