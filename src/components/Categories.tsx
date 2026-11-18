import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { CATEGORIES } from '../data/categories';
import { useSidebarReveal } from '../hooks/useSidebarReveal';
import type { CSSVars } from '../types';
import { Icon } from './Icon';
import './Categories.css';

/**
 * Every category gets the same fixed block of slots (4 × 2, or 2 × 4 when narrow)
 * so the grid never changes size or position when switching. Sized to the
 * largest category; any free slots are filled by one "Talk to us" tile.
 */
const SLOTS = Math.max(...CATEGORIES.map((c) => c.products.length));

/** Moves the hover spotlight on whichever product card is under the pointer. */
function trackSpotlight(e: PointerEvent<HTMLDivElement>) {
  const card = (e.target as HTMLElement).closest<HTMLElement>('.product');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - r.left}px`);
  card.style.setProperty('--y', `${e.clientY - r.top}px`);
}

export function Categories() {
  const [active, setActive] = useState(0);
  const aside = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const shown = useSidebarReveal(aside, content);
  const category = CATEGORIES[active];
  const free = SLOTS - category.products.length;

  return (
    <section className={`categories${shown ? ' in' : ''}`} id="cat">
      <aside ref={aside}>
        <div className="mi">Categories</div>
        <div>
          {CATEGORIES.map((c, i) => (
            <button key={c.name} aria-current={i === active} onClick={() => setActive(i)}>
              {c.name}
            </button>
          ))}
        </div>
      </aside>
      <div className="categories-main" ref={content}>
        <h2 className="categories-title">{category.name}</h2>
        {/* Keyed by category so the cards remount and replay their entrance. */}
        <div className="products" key={category.name} onPointerMove={trackSpotlight}>
          {category.products.map((p, k) => (
            <div className="product" key={p.label} style={{ animationDelay: `${k * 60}ms` }}>
              <Icon name={p.icon} />
              <span>{p.label}</span>
            </div>
          ))}
          {free > 0 && (
            <a
              className="product product--more"
              href="#contact"
              style={{ '--span': free, animationDelay: `${category.products.length * 60}ms` } as CSSVars}
            >
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" aria-hidden="true">
                <circle cx="24" cy="24" r="16" strokeDasharray="1.5 3.5" />
                <path d="M24 18v12M18 24h12" />
              </svg>
              <span>
                Not listed?
                <b>Talk to us →</b>
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
