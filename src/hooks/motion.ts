/** Rich pointer effects only for mouse/trackpad users who haven't asked for reduced motion. */
export const prefersRichMotion = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.matchMedia('(pointer: fine)').matches;
