import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './Overlay.css';

interface OverlayProps {
  open: boolean;
  label: string;
  children: ReactNode;
}

/** A full-screen page drawn over the site. Opened and closed by the URL hash. */
export function Overlay({ open, label, children }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !ref.current) return;
    ref.current.scrollTop = 0;
    ref.current.focus();
  }, [open]);

  return (
    <div
      ref={ref}
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      hidden={!open}
    >
      <a className="overlay-back" href="#home">
        ← Back
      </a>
      {children}
    </div>
  );
}
