import { BlindsTile } from './BlindsTile';
import { ClimateTile } from './ClimateTile';
import { EnergyTile } from './EnergyTile';
import { LightsTile } from './LightsTile';
import { SceneTile } from './SceneTile';
import { SoundTile } from './SoundTile';
import './ControlPanel.css';

export function ControlPanel() {
  return (
    <div className="panel-scroll">
      <div className="panel-edge">
        <div className="panel">
          <SceneTile />
          <LightsTile />
          <ClimateTile />
          <BlindsTile />
          <SoundTile />
          <EnergyTile />
        </div>
      </div>
    </div>
  );
}
