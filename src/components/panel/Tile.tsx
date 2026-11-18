import type { ReactNode } from 'react';

export function Tile({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="tile">
      <h4>{title}</h4>
      {children}
    </div>
  );
}
