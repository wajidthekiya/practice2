# practice2 — Remotion

Videos built with React using [Remotion](https://www.remotion.dev/).

## Commands

```bash
npm install        # install dependencies
npm run dev        # open Remotion Studio (live preview in the browser)
npm run build      # render the HelloWorld composition to out/video.mp4
npm run lint       # type-check
npm run upgrade    # upgrade all Remotion packages together
```

Render a specific composition: `npx remotion render <CompositionId> out/<name>.mp4`

## Structure

- `src/index.ts` — entry point, registers the root
- `src/Root.tsx` — lists all compositions (id, size, fps, duration, default props)
- `src/HelloWorld.tsx` — example animated composition
- `public/` — static assets, used via `staticFile("name.png")`
- `remotion.config.ts` — CLI/render config

Docs: https://www.remotion.dev/docs
