import { SCENES, SOLAR_MAX_KW } from '../../data/scenes';
import { useHome } from '../../state/useHome';
import { Tile } from './Tile';

export function EnergyTile() {
  const { scene, armed, toggleArmed } = useHome();
  const solar = SCENES[scene].solar;

  return (
    <Tile title="Energy and security">
      <div className="mi">
        Solar <b>{solar}</b> kW
      </div>
      <div className="bar">
        <i style={{ width: `${Math.min(100, (solar / SOLAR_MAX_KW) * 100)}%` }} />
      </div>
      <button className="arm" aria-pressed={armed} onClick={toggleArmed}>
        {armed ? 'Armed' : 'Disarmed'}
      </button>
    </Tile>
  );
}
