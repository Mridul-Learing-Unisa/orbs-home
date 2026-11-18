/**
 * One soundtrack per scene, generated live in the browser by the music engine.
 * Original and royalty-free: nothing is recorded or sampled.
 *
 * Patterns are 16 steps; "x" triggers the voice on that step.
 */
export interface Soundtrack {
  name: string;
  description: string;
  bpm: number;
  /** Swing amount applied to every other 16th note (0–1 of a step). */
  swing: number;
  /** Four chords of MIDI note numbers; one chord per bar. */
  chords: readonly (readonly number[])[];
  kick: string;
  snare: string;
  hat: string;
  /** Oscillator type for chords. */
  wave?: OscillatorType;
  /** Low-pass cutoff for chord voices, in Hz. */
  lowpass: number;
  /** Sustained pad mode: one long chord per bar plus sub bass. */
  pad?: boolean;
  /** Pad attack time in seconds. */
  attack?: number;
  /** Pluck mode: short stabs on the `pluckPattern` steps. */
  pluck?: boolean;
  pluckPattern?: string;
}

const SILENT = '................';

export const SOUNDTRACKS: readonly Soundtrack[] = [
  { name: 'Sunrise', description: 'Soft and bright', bpm: 70, swing: 0.15, chords: [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 65]], kick: 'x.......x.......', snare: '........x.......', hat: 'x...x...x...x...', wave: 'triangle', lowpass: 2200 },
  { name: 'Day', description: 'Light groove', bpm: 84, swing: 0.2, chords: [[62, 66, 69, 73], [59, 62, 66, 69], [55, 59, 62, 66], [57, 61, 64, 68]], kick: 'x..x..x...x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.xx', wave: 'triangle', lowpass: 2600 },
  { name: 'Sunset', description: 'Smooth R&B', bpm: 66, swing: 0.25, chords: [[57, 60, 64, 67], [55, 59, 62, 65], [53, 57, 60, 64], [52, 55, 59, 62]], kick: 'x..x..x.....x...', snare: '....x.......x...', hat: 'x.xxx.xxx.xxx.xx', wave: 'sine', lowpass: 1800 },
  { name: 'Entertain', description: 'Party beats', bpm: 100, swing: 0.1, chords: [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]], kick: 'x...x...x...x...', snare: '....x.......x...', hat: 'x.xxx.xxx.xxx.xx', pluck: true, pluckPattern: '..x...x...x...x.', lowpass: 1600 },
  { name: 'Cinema', description: 'Ambient score', bpm: 60, swing: 0, pad: true, attack: 1.5, chords: [[45, 52, 57, 60], [43, 50, 55, 59], [41, 48, 53, 57], [40, 47, 52, 55]], kick: SILENT, snare: SILENT, hat: SILENT, wave: 'sawtooth', lowpass: 600 },
  { name: 'Night', description: 'Dark chill', bpm: 62, swing: 0.2, chords: [[57, 60, 64, 67], [53, 57, 60, 64], [50, 53, 57, 60], [52, 55, 59, 62]], kick: 'x.........x.....', snare: '............x...', hat: '..x.....x.......', wave: 'sine', lowpass: 900 },
  { name: 'Sleep', description: 'Lullaby pad', bpm: 50, swing: 0, pad: true, attack: 2, chords: [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 67]], kick: SILENT, snare: SILENT, hat: SILENT, wave: 'sine', lowpass: 800 },
  { name: 'Away', description: 'Low hum', bpm: 58, swing: 0, pad: true, attack: 2.5, chords: [[45, 52, 57], [43, 50, 55], [41, 48, 53], [40, 47, 52]], kick: SILENT, snare: SILENT, hat: SILENT, wave: 'sine', lowpass: 450 },
];
