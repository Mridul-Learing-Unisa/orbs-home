export type Palette = readonly [c1: string, c2: string, c3: string];

export interface Scene {
  name: string;
  line: string;
  /** Three glow colours that tint the whole page. */
  palette: Palette;
  /** Living, kitchen, bedroom brightness (0–100). */
  lights: readonly [number, number, number];
  /** Target temperature in °C. */
  temp: number;
  /** How far the blinds are open (0–100). */
  blinds: number;
  /** Volume to use when music is already playing (0–100). */
  volume: number;
  /** Whether this scene suggests music. The panel leaves play/pause to the visitor. */
  playing: boolean;
  armed: boolean;
  /** Current solar generation in kW. */
  solar: number;
}

export const SCENES: readonly Scene[] = [
  { name: 'Sunrise', line: 'The house wakes up.', palette: ['#F2A65A', '#E86F68', '#F6D58E'], lights: [45, 30, 65], temp: 22, blinds: 85, volume: 25, playing: true, armed: false, solar: 0.8 },
  { name: 'Day', line: 'Natural light, quiet comfort.', palette: ['#8FB8FF', '#9AD9C9', '#F2E3A4'], lights: [10, 15, 10], temp: 24, blinds: 60, volume: 0, playing: false, armed: false, solar: 4.2 },
  { name: 'Sunset', line: 'Warm light and soft sound.', palette: ['#E5704F', '#A0508F', '#F2A65A'], lights: [40, 45, 35], temp: 23, blinds: 40, volume: 30, playing: true, armed: false, solar: 1.4 },
  { name: 'Entertain', line: 'Ready for guests.', palette: ['#C85A9A', '#F2B54A', '#6A5BD6'], lights: [75, 85, 60], temp: 22, blinds: 70, volume: 55, playing: true, armed: false, solar: 0.6 },
  { name: 'Cinema', line: 'Everything becomes a theatre.', palette: ['#3A4FE0', '#7B3FD0', '#C23A4F'], lights: [8, 0, 0], temp: 21, blinds: 0, volume: 40, playing: true, armed: false, solar: 0.2 },
  { name: 'Night', line: 'Security and comfort in the dark.', palette: ['#243A9A', '#3E3590', '#0D6B7A'], lights: [10, 5, 0], temp: 20, blinds: 0, volume: 0, playing: false, armed: true, solar: 0 },
  { name: 'Sleep', line: 'The whole house settles.', palette: ['#1F2A6B', '#3A2F78', '#17485E'], lights: [0, 0, 2], temp: 19, blinds: 0, volume: 0, playing: false, armed: true, solar: 0 },
  { name: 'Away', line: 'The house protects itself.', palette: ['#4A6F8A', '#5C7F6E', '#7E5864'], lights: [0, 0, 0], temp: 26, blinds: 0, volume: 0, playing: false, armed: true, solar: 2.6 },
];

export const DEFAULT_SCENE = 4; // Cinema

export const LIGHT_ROOMS = ['Living', 'Kitchen', 'Bedroom'] as const;

export const TEMP_MIN = 16;
export const TEMP_MAX = 30;
/** Solar bar is full at this many kW. */
export const SOLAR_MAX_KW = 5;
