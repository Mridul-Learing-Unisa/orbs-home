import type { Soundtrack } from '../data/soundtracks';

/** How often the scheduler wakes, and how far ahead it books notes. */
const TICK_MS = 40;
const LOOKAHEAD_S = 0.25;
/** Master gain at 100% volume. */
const MAX_GAIN = 0.45;

const midiToHz = (note: number) => 440 * Math.pow(2, (note - 69) / 12);

type AudioContextCtor = typeof AudioContext;

/**
 * A tiny step sequencer built on the Web Audio API. Every sound is synthesised
 * live (oscillators and filtered noise), so nothing is recorded or sampled.
 */
export class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: number | undefined;
  private nextTime = 0;
  private step = 0;
  private track: Soundtrack;
  private volume = 0.5;

  constructor(initialTrack: Soundtrack) {
    this.track = initialTrack;
  }

  /** Must be called from a user gesture (click) the first time, so browsers allow audio. */
  play() {
    const ctx = this.ensureContext();
    void ctx.resume();
    this.nextTime = ctx.currentTime + 0.1;
    this.step = 0;
    window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.schedule(), TICK_MS);
    this.applyVolume();
  }

  stop() {
    window.clearInterval(this.timer);
    this.timer = undefined;
  }

  setTrack(track: Soundtrack) {
    this.track = track;
    this.step = 0;
  }

  /** @param percent 0–100 */
  setVolume(percent: number) {
    this.volume = percent / 100;
    this.applyVolume();
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.noise = null;
  }

  private ensureContext(): AudioContext {
    if (this.ctx) return this.ctx;
    const Ctor: AudioContextCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioContextCtor }).webkitAudioContext;
    const ctx = new Ctor();

    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // One second of white noise, reused for snares and hats.
    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    return ctx;
  }

  private applyVolume() {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(this.volume * MAX_GAIN, this.ctx.currentTime, 0.3);
  }

  /** Book every 16th note that falls inside the lookahead window. */
  private schedule() {
    if (!this.ctx) return;
    const t = this.track;
    const stepLen = 60 / t.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + LOOKAHEAD_S) {
      const swing = this.step % 2 ? t.swing * stepLen : 0;
      this.playStep(this.nextTime + swing);
      this.nextTime += stepLen;
      this.step++;
    }
  }

  private playStep(time: number) {
    const t = this.track;
    const i = this.step % 16;
    const chord = t.chords[Math.floor(this.step / 16) % t.chords.length];
    const beat = 60 / t.bpm;

    if (t.kick[i] === 'x') this.kick(time);
    if (t.snare[i] === 'x') {
      this.noiseHit(time, 0.18, 1500, 0.35);
      this.tone(190, time, 0.1, 'triangle', 0.2, 2000);
    }
    if (t.hat[i] === 'x') this.noiseHit(time, 0.04, 7000, i % 4 ? 0.1 : 0.18);

    const root = chord[0];
    const wave = t.wave ?? 'sine';

    if (t.pad) {
      if (i === 0) {
        chord.forEach((n) => this.tone(midiToHz(n), time, beat * 4.2, wave, 0.07, t.lowpass, t.attack));
        this.tone(midiToHz(root - 12), time, beat * 4.2, 'sine', 0.22, 250, t.attack);
      }
    } else if (t.pluck) {
      if (t.pluckPattern?.[i] === 'x') {
        chord.forEach((n) => this.tone(midiToHz(n + 12), time, 0.25, 'sawtooth', 0.05, 1800));
      }
      if (i === 0 || i === 10) this.tone(midiToHz(root - 24), time, beat * 0.9, 'sine', 0.5, 300);
    } else {
      if (i === 0 || i === 10) {
        chord.forEach((n) => this.tone(midiToHz(n), time, beat * (i ? 1.2 : 3.2), wave, 0.06, t.lowpass));
      }
      if (i === 0 || i === 6 || i === 10) this.tone(midiToHz(root - 24), time, beat * 0.8, 'sine', 0.45, 300);
    }
  }

  private noiseHit(time: number, duration: number, highpass: number, gain: number) {
    const { ctx, master, noise } = this;
    if (!ctx || !master || !noise) return;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = highpass;
    const env = ctx.createGain();
    env.gain.setValueAtTime(gain, time);
    env.gain.exponentialRampToValueAtTime(0.001, time + duration);
    src.connect(filter).connect(env).connect(master);
    src.start(time);
    src.stop(time + duration);
  }

  private tone(
    freq: number,
    time: number,
    duration: number,
    type: OscillatorType,
    gain: number,
    lowpass: number,
    attack = 0.02,
  ) {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = lowpass;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gain, time + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(filter).connect(env).connect(master);
    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  private kick(time: number) {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);
    env.gain.setValueAtTime(0.9, time);
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
    osc.connect(env).connect(master);
    osc.start(time);
    osc.stop(time + 0.4);
  }
}
