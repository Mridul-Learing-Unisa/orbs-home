import type { ReactNode } from 'react';

export function Tile({ title, className, children }: { title: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={className ? `tile ${className}` : 'tile'}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
