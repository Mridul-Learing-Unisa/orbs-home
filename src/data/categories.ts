import type { IconName } from './icons';

export interface Product {
  label: string;
  icon: IconName;
}

export interface Category {
  name: string;
  products: readonly Product[];
}

/** Product categories are illustrative and carry no brand endorsement. Edit labels freely. */
export const CATEGORIES: readonly Category[] = [
  {
    name: 'Lighting',
    products: [
      { label: 'Smart switches', icon: 'switch' },
      { label: 'Dimmers', icon: 'dimmer' },
      { label: 'LED strips', icon: 'strip' },
      { label: 'Downlights', icon: 'down' },
      { label: 'Stair and cabinet lighting', icon: 'stair' },
      { label: 'Smart bulbs', icon: 'bulb' },
      { label: 'Presence sensors', icon: 'radar' },
      { label: 'Pool and garden lighting', icon: 'pool' },
    ],
  },
  {
    name: 'Shading',
    products: [
      { label: 'Motorised blinds', icon: 'blind' },
      { label: 'Curtain tracks', icon: 'curtain' },
      { label: 'External awnings', icon: 'awn' },
      { label: 'Skylights and windows', icon: 'win' },
      { label: 'Sun and rain sensors', icon: 'wx' },
      { label: 'Wall controllers', icon: 'knob' },
    ],
  },
  {
    name: 'Climate and air',
    products: [
      { label: 'Thermostats', icon: 'therm' },
      { label: 'Air-conditioning', icon: 'ac' },
      { label: 'Underfloor heating', icon: 'heat' },
      { label: 'Ceiling and exhaust fans', icon: 'fan' },
      { label: 'Air-quality sensors', icon: 'air' },
      { label: 'Presence sensors', icon: 'radar' },
    ],
  },
  {
    name: 'Access and security',
    products: [
      { label: 'Smart locks', icon: 'lock' },
      { label: 'Video doorbells', icon: 'bell' },
      { label: 'Cameras', icon: 'cam' },
      { label: 'Alarm panels', icon: 'alarm' },
      { label: 'Door and window sensors', icon: 'door' },
      { label: 'Gate and garage', icon: 'garage' },
      { label: 'Leak sensors', icon: 'drop' },
      { label: 'Smoke detectors', icon: 'smoke' },
    ],
  },
  {
    name: 'Energy and water',
    products: [
      { label: 'Energy meters', icon: 'meter' },
      { label: 'Circuit monitors', icon: 'meter' },
      { label: 'Solar inverters', icon: 'solar' },
      { label: 'Batteries', icon: 'batt' },
      { label: 'EV chargers', icon: 'ev' },
      { label: 'Smart plugs', icon: 'plug' },
      { label: 'Water shut-off', icon: 'drop' },
    ],
  },
  {
    name: 'Sound and screen',
    products: [
      { label: 'Ceiling speakers', icon: 'cspk' },
      { label: 'Amplifiers', icon: 'spk' },
      { label: 'Multi-room streamers', icon: 'spk' },
      { label: 'Projectors', icon: 'proj' },
      { label: 'Projector screens', icon: 'scr' },
      { label: 'Displays', icon: 'tv' },
    ],
  },
  {
    name: 'Rooms and outdoor',
    products: [
      { label: 'Robot vacuums', icon: 'robo' },
      { label: 'Irrigation', icon: 'spr' },
      { label: 'Pool pumps', icon: 'pool' },
      { label: 'Washers and dryers', icon: 'wash' },
      { label: 'Coffee machines', icon: 'cof' },
      { label: 'Wine cellar', icon: 'wine' },
      { label: 'Heated towel rails', icon: 'heat' },
      { label: 'Bathroom', icon: 'bath' },
    ],
  },
  {
    name: 'Control and network',
    products: [
      { label: 'Wall tablets', icon: 'pan' },
      { label: 'Voice satellites', icon: 'mic' },
      { label: 'Scene buttons', icon: 'knob' },
      { label: 'Hubs', icon: 'hub' },
      { label: 'Zigbee and Thread', icon: 'hub' },
      { label: 'Routers and PoE', icon: 'rt' },
      { label: 'Wi-Fi access points', icon: 'rt' },
      { label: 'Servers', icon: 'srv' },
    ],
  },
];
