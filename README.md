# ORBS Home

The ORBS home-automation marketing site, rebuilt from the single-file design (`../orbs-home.html`) as a React + TypeScript app on Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint
```

## Structure

```
src/
  data/            all copy and content: scenes, soundtracks, categories, icons, terms
  audio/           MusicEngine: live Web Audio sequencer (no recorded audio)
  state/           HomeProvider + useHome: the shared scene/panel state
  hooks/           hash routing, clock, scroll/pointer effects, in-view
  components/
    panel/         the six control-panel tiles
    pages/         the Terms overlay page (#terms)
  styles/global.css  colour tokens, typography, reduced-motion rules
```

Most content edits happen in `src/data/`. Each component imports its own CSS file.

## How it works

- **Scenes drive everything.** Picking a scene (panel buttons, ‹ › in Sound, or the mood orbs in the nav bar) updates lights, climate, blinds, alarm, solar and soundtrack, and writes the scene palette to `--c1..--c3` on `<html>`. Those are registered with `@property`, so the whole page fades between colours.
- **Background** is five drifting orbs of scene-coloured light ([Backdrop.css](src/components/Backdrop.css)). [useAmbientMotion](src/hooks/useAmbientMotion.ts) feeds them scroll progress, scroll speed and pointer position each frame, so they travel, swirl, swell and lean as you move.
- **Music** starts only from the Play button (browsers require a click). Each scene has its own generated soundtrack.
- **Talk to us** is the last section of the page (#contact): the enquiry form opens the visitor's email app with the message filled in.
- **Terms** is an overlay opened from the URL hash (#terms), so links, Back and Escape all work.
- `prefers-reduced-motion` turns off animations, the pointer halo and the magnetic button.
