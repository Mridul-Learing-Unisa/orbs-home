import type { Palette } from '../data/scenes';

/**
 * Writes a scene palette to --c1..--c3 on <html>. CSS fades between palettes;
 * pass `instant` to skip the fade (used on first load so the page doesn't
 * visibly drift from the CSS defaults into the starting scene).
 */
export function applyPalette(palette: Palette, instant = false) {
  const root = document.documentElement;
  if (instant) root.style.transition = 'none';
  palette.forEach((c, k) => root.style.setProperty(`--c${k + 1}`, c));
  if (instant) {
    void root.offsetHeight; // commit the new colours before restoring the transition
    root.style.transition = '';
  }
}
