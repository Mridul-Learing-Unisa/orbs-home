import { SCENES } from '../data/scenes';
import { useHome } from '../state/useHome';
import type { CSSVars } from '../types';
import './MoodOrbs.css';

/** One glowing orb per scene; picking one re-tints the whole site. Lives in the nav. */
export function MoodOrbs() {
  const { scene, selectScene } = useHome();
  return (
    <div className="orbs" role="group" aria-label="Set the mood">
      {SCENES.map((s, i) => {
        const [c1, c2, c3] = s.palette;
        const style: CSSVars = {
          background: `radial-gradient(circle at 35% 30%, ${c3}, ${c1})`,
          '--g': c2,
        };
        return (
          <button
            key={s.name}
            style={style}
            title={s.name}
            aria-label={`${s.name} mood`}
            aria-pressed={i === scene}
            onClick={() => selectScene(i)}
          />
        );
      })}
    </div>
  );
}
