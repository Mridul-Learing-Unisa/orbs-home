import { useEffect, useState } from 'react';

/**
 * Watches a thin band across the middle of the viewport (top 50% and bottom 49%
 * trimmed off): the hero counts as "on screen" while it still reaches that line,
 * i.e. while it covers at least the top half of the viewport.
 */
const ROOT_MARGIN = '-50% 0px -49% 0px';

/**
 * True while the visitor is on the home (hero) screen: the element with `id`
 * still reaches the middle of the viewport. Used to show the top bar only there.
 */
export function useOnHomeScreen(id = 'home'): boolean {
  const [onHome, setOnHome] = useState(true);

  useEffect(() => {
    const hero = document.getElementById(id);
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setOnHome(entry.isIntersecting), {
      rootMargin: ROOT_MARGIN,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [id]);

  return onHome;
}
