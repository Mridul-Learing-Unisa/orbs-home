import { useHome } from '../../state/useHome';
import { Range } from '../Range';
import { Tile } from './Tile';

export function BlindsTile() {
  const { blinds, setBlinds } = useHome();
  return (
    <Tile title="Blinds" className="tile--blinds">
      <div className="window">
        <div className="blind" style={{ height: `${100 - blinds}%` }} />
      </div>
      <Range value={blinds} onChange={setBlinds} label="Blinds open" />
    </Tile>
  );
}
