import type { CSSProperties } from 'react';

/** Inline styles that also accept CSS custom properties, e.g. { '--v': '40%' }. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
