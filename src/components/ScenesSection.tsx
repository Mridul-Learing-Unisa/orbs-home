import { ControlPanel } from './panel/ControlPanel';
import './ScenesSection.css';

export function ScenesSection() {
  return (
    <section className="scenes" id="scenes">
      <div className="wrap">
        <h2>Choose a scene. The whole house answers.</h2>
        <div className="mi scenes-kicker">Control panel · touch everything</div>
      </div>
      <ControlPanel />
      <div className="mi scenes-hint">Select a scene. Then adjust anything by hand.</div>
    </section>
  );
}
