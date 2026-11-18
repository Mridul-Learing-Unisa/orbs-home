import { LIGHT_ROOMS } from '../../data/scenes';
import { useHome } from '../../state/useHome';
import { Range } from '../Range';
import { Tile } from './Tile';

export function LightsTile() {
  const { lights, setLight } = useHome();
  return (
    <Tile title="Lights">
      {LIGHT_ROOMS.map((room, k) => (
        <div className="light-row" key={room}>
          <span>{room}</span>
          <Range value={lights[k]} onChange={(v) => setLight(k, v)} label={`${room} lights`} />
          <span>{lights[k]}%</span>
        </div>
      ))}
    </Tile>
  );
}
