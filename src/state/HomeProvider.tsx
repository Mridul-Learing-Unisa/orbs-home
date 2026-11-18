import { useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import type { ReactNode } from 'react';
import { MusicEngine } from '../audio/MusicEngine';
import { DEFAULT_SCENE, SCENES } from '../data/scenes';
import { SOUNDTRACKS } from '../data/soundtracks';
import { homeReducer, initHomeState } from './homeReducer';
import { applyPalette } from './palette';
import { HomeContext } from './useHome';
import type { HomeContextValue } from './useHome';

export function HomeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(homeReducer, DEFAULT_SCENE, initHomeState);
  const engineRef = useRef<MusicEngine | null>(null);
  const engine = () => (engineRef.current ??= new MusicEngine(SOUNDTRACKS[DEFAULT_SCENE]));

  // Each scene has its own soundtrack.
  useEffect(() => {
    engine().setTrack(SOUNDTRACKS[state.scene]);
  }, [state.scene]);

  useEffect(() => {
    engine().setVolume(state.volume);
  }, [state.volume]);

  useEffect(() => () => engineRef.current?.dispose(), []);

  // Tint the whole page with the active scene's palette. Runs before paint; the
  // first run is instant, later scene changes fade via CSS @property.
  const paletteApplied = useRef(false);
  useLayoutEffect(() => {
    applyPalette(SCENES[state.scene].palette, !paletteApplied.current);
    paletteApplied.current = true;
  }, [state.scene]);

  const value = useMemo<HomeContextValue>(
    () => ({
      ...state,
      selectScene: (index) => dispatch({ type: 'scene', index }),
      stepScene: (delta) =>
        dispatch({ type: 'scene', index: (state.scene + delta + SCENES.length) % SCENES.length }),
      setLight: (room, v) => dispatch({ type: 'light', room, value: v }),
      nudgeTemp: (delta) => dispatch({ type: 'nudgeTemp', delta }),
      setBlinds: (v) => dispatch({ type: 'blinds', value: v }),
      setVolume: (v) => dispatch({ type: 'volume', value: v }),
      // Audio must start inside the click handler (not an effect) so Safari allows it.
      togglePlay: () => {
        if (state.playing) engine().stop();
        else engine().play();
        dispatch({ type: 'setPlaying', playing: !state.playing });
      },
      toggleArmed: () => dispatch({ type: 'toggleArmed' }),
    }),
    [state],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}
