import { SOUNDTRACKS } from '../../data/soundtracks';
import { useHome } from '../../state/useHome';
import { Range } from '../Range';
import { Tile } from './Tile';

const EQ_BARS = 8;

export function SoundTile() {
  const { scene, volume, playing, setVolume, togglePlay, stepScene } = useHome();
  const track = SOUNDTRACKS[scene];
  const live = playing && volume > 0;

  return (
    <Tile title="Sound">
      <div className={`eq${live ? ' on' : ''}`} aria-hidden="true">
        {Array.from({ length: EQ_BARS }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="mi">
        {track.name} · {track.description}
      </div>
      <Range value={volume} onChange={setVolume} label="Volume" />
      <div className="stepper stepper--flush">
        <button aria-label="Previous scene soundtrack" onClick={() => stepScene(-1)}>
          ‹
        </button>
        <button aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlay}>
          {playing ? '❚❚' : '▶'}
        </button>
        <button aria-label="Next scene soundtrack" onClick={() => stepScene(1)}>
          ›
        </button>
      </div>
    </Tile>
  );
}
