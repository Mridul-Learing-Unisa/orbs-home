import { SCENES } from '../../data/scenes';
import { useClock } from '../../hooks/useClock';
import { useHome } from '../../state/useHome';
import { Tile } from './Tile';

export function SceneTile() {
  const { scene, selectScene } = useHome();
  const time = useClock();
  const s = SCENES[scene];

  return (
    <Tile title={time} className="tile--scene">
      <div className="scene-name">{s.name}</div>
      <div className="scene-line">{s.line}</div>
      <div className="scene-buttons">
        {SCENES.map((sc, i) => (
          <button key={sc.name} aria-pressed={i === scene} onClick={() => selectScene(i)}>
            {sc.name}
          </button>
        ))}
      </div>
    </Tile>
  );
}
