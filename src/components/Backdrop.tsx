import { useRef } from 'react';
import { useAmbientMotion } from '../hooks/useAmbientMotion';
import { useHalo } from '../hooks/useHalo';
import type { CSSVars } from '../types';
import './Backdrop.css';

/**
 * Five soft orbs of light, one per layer. Each has:
 *  - a colour from the active scene palette (so moods still fade across the page)
 *  - its own slow drift loop (CSS keyframes)
 *  - a depth that sets how far it travels, swirls and leans as you scroll and move the pointer
 * Values are CSS custom properties consumed by Backdrop.css.
 */
const ORBS = [
  { name: 'a', depth: 1.0 },
  { name: 'b', depth: 0.75 },
  { name: 'c', depth: 0.9 },
  { name: 'd', depth: 1.35 },
  { name: 'e', depth: 0.55 },
] as const;

/** Living ambient light, a pointer-following halo and film grain behind everything. */
export function Backdrop() {
  const field = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  useAmbientMotion(field);
  useHalo(halo);

  return (
    <>
      <div className="ambient" ref={field} aria-hidden="true">
        {ORBS.map((o) => (
          <div key={o.name} className={`orb-track orb-track--${o.name}`} style={{ '--depth': o.depth } as CSSVars}>
            <div className={`orb orb--${o.name}`} />
          </div>
        ))}
      </div>
      <div className="halo" ref={halo} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
