import { useHome } from '../../state/useHome';
import { Tile } from './Tile';

export function ClimateTile() {
  const { temp, armed, nudgeTemp } = useHome();
  return (
    <Tile title="Climate">
      <div className="big-temp">{temp}°</div>
      <div className="stepper">
        <button aria-label="Cooler" onClick={() => nudgeTemp(-1)}>
          −
        </button>
        <span className="mi climate-status">{armed ? 'Holding' : 'Comfort'}</span>
        <button aria-label="Warmer" onClick={() => nudgeTemp(1)}>
          +
        </button>
      </div>
    </Tile>
  );
}
