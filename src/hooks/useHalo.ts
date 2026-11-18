import { useEffect } from 'react';
import type { RefObject } from 'react';
import { prefersRichMotion } from './motion';

const EASE = 0.06;

/** A soft glow that eases after the pointer. */
export function useHalo(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !prefersRichMotion()) return;

    const half = el.offsetWidth / 2;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      x += (mx - x) * EASE;
      y += (my - y) * EASE;
      el.style.transform = `translate(${x - half}px, ${y - half}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
