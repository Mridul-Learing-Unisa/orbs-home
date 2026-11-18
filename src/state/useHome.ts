import { createContext, useContext } from 'react';
import type { HomeState } from './homeReducer';

export interface HomeContextValue extends HomeState {
  selectScene: (index: number) => void;
  stepScene: (delta: 1 | -1) => void;
  setLight: (room: number, value: number) => void;
  nudgeTemp: (delta: number) => void;
  setBlinds: (value: number) => void;
  setVolume: (value: number) => void;
  togglePlay: () => void;
  toggleArmed: () => void;
}

export const HomeContext = createContext<HomeContextValue | null>(null);

export function useHome(): HomeContextValue {
  const ctx = useContext(HomeContext);
  if (!ctx) throw new Error('useHome must be used inside <HomeProvider>');
  return ctx;
}
