import { SCENES, TEMP_MAX, TEMP_MIN } from '../data/scenes';

export interface HomeState {
  scene: number;
  lights: [number, number, number];
  temp: number;
  blinds: number;
  volume: number;
  playing: boolean;
  armed: boolean;
}

export type HomeAction =
  | { type: 'scene'; index: number }
  | { type: 'light'; room: number; value: number }
  | { type: 'nudgeTemp'; delta: number }
  | { type: 'blinds'; value: number }
  | { type: 'volume'; value: number }
  | { type: 'setPlaying'; playing: boolean }
  | { type: 'toggleArmed' };

/** Volume a scene falls back to when music is on but the scene itself is silent. */
const FALLBACK_VOLUME = 12;

export function applyScene(state: HomeState, index: number): HomeState {
  const s = SCENES[index];
  return {
    ...state,
    scene: index,
    lights: [...s.lights],
    temp: s.temp,
    blinds: s.blinds,
    // The visitor decides whether music plays; a scene only sets the level.
    volume: state.playing ? s.volume || FALLBACK_VOLUME : state.volume,
    armed: s.armed,
  };
}

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'scene':
      return applyScene(state, action.index);
    case 'light': {
      const lights = [...state.lights] as HomeState['lights'];
      lights[action.room] = action.value;
      return { ...state, lights };
    }
    case 'nudgeTemp':
      return { ...state, temp: Math.min(TEMP_MAX, Math.max(TEMP_MIN, state.temp + action.delta)) };
    case 'blinds':
      return { ...state, blinds: action.value };
    case 'volume':
      return { ...state, volume: action.value };
    case 'setPlaying':
      return { ...state, playing: action.playing };
    case 'toggleArmed':
      return { ...state, armed: !state.armed };
  }
}

export function initHomeState(sceneIndex: number): HomeState {
  return applyScene(
    { scene: sceneIndex, lights: [50, 50, 50], temp: 22, blinds: 50, volume: 50, playing: false, armed: false },
    sceneIndex,
  );
}
