import { useEffect, useState } from 'react';

export type Page = 'terms';
const PAGES: readonly string[] = ['terms'] satisfies Page[];

const readPage = (): Page | null => {
  const h = window.location.hash.slice(1);
  return PAGES.includes(h) ? (h as Page) : null;
};

/**
 * The Terms overlay lives at #terms so links, Back and the browser's own back
 * button all work. Escape returns to #home. (#contact is an ordinary section.)
 */
export function useHashRoute(): Page | null {
  const [page, setPage] = useState<Page | null>(readPage);

  useEffect(() => {
    const onHash = () => setPage(readPage());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && readPage()) window.location.hash = 'home';
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Lock page scroll behind an open overlay.
  useEffect(() => {
    const open = page !== null;
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('pgopen', open);
  }, [page]);

  return page;
}
