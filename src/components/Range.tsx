import type { CSSVars } from '../types';
import './Range.css';

interface RangeProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

/** A 0–100 slider whose track fills up to the thumb in the scene's accent colour. */
export function Range({ value, onChange, label, min = 0, max = 100 }: RangeProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="range"
      min={min}
      max={max}
      value={value}
      aria-label={label}
      style={{ '--v': `${pct}%` } as CSSVars}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}
