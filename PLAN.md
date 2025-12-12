# PixiJS v8 Migration Plan for `pixijs-node`

## Goals
- Update `pixijs-node` to run exclusively on PixiJS v8 (no v7 compatibility required).
- Keep the Node.js rendering experience (headless WebGL/canvas) working.
- Align with v8’s new module layout, adapter system, and texture pipeline.

## High-Level Phases
1) **Upgrade dependencies & imports**
2) **Replace adapter wiring with v8 DOMAdapter workflow**
3) **Implement Node environment extension**
4) **Port texture/canvas integration to v8 TextureSource model**
5) **Refresh asset loaders/parsers for v8**
6) **Harden Node shims & globals**
7) **Cleanup deprecated exports/tests and verify**

## Detailed Steps

### 1) Upgrade dependencies & imports
- Replace all `@pixi/*` deps with the single `pixi.js` package (v8.x) in `package.json`.
- Update source imports/exports to use `pixi.js` subpath exports (e.g., `pixi.js/app`, `pixi.js/assets`).
- Remove any unused v7-only packages (mixin packages, etc.).

### 2) Replace adapter wiring with v8 DOMAdapter workflow
- Drop `settings.ADAPTER` and `INSTALLED`; use `DOMAdapter.set(NodeAdapter)`.
- Add required adapter methods for v8: `createImage`, `getNavigator` returning `{ userAgent, gpu: null }`, etc.
- Ensure fetch/path handling still supports file URLs and HTTP.

### 3) Implement Node environment extension
- Create an `ExtensionType.Environment` entry (e.g., `nodeExt`) with a higher priority than `browserExt`.
- In `load`, set the Node adapter and import only Node-safe init modules (avoid browser DOM modules).
- Hook environment auto-detection so renderer init loads the Node extension.

### 4) Port texture/canvas integration to v8 TextureSource model
- Replace `NodeCanvasResource`/`BaseTexture` usage with a custom `TextureSource` subclass (or adapt `CanvasSource/ImageSource` detection) for `NodeCanvasElement`.
- Ensure `NodeCanvasElement` satisfies `ICanvas`: add webgl2/webgpu overloads returning `null`, `style` shape, optional `toBlob/convertToBlob/getBoundingClientRect`.
- Make sure texture upload path (`uploadMethodId`) works with GL renderer; handle premultiplied alpha flags as needed.

### 5) Refresh asset loaders/parsers for v8
- Update `loadNodeTexture`, `loadNodeBase64`, `loadNodeFont` to v8 parser shape (`id`, `extension` metadata, priorities).
- Remove/override browser-only parsers (web fonts via FontFace, video format detections) when running in Node.
- Keep/replace format detections only if Node-capable; otherwise supply minimal defaults.
- Verify `Texture.from` is not used for loading; rely on `Assets` to preload before use.

### 6) Harden Node shims & globals
- Keep `requestAnimationFrame`/`cancelAnimationFrame` polyfills; add any missing globals (`HTMLCanvasElement`, `Image`) pointing to `canvas` equivalents if needed for detection.
- Ensure `DOMAdapter.getNavigator().gpu` is `null` to avoid WebGPU code paths; supply `getWebGLRenderingContext` (from `gl`).

### 7) Cleanup, tests, and validation
- Remove deprecated `filters` proxy or update deprecation calls to v8 logging helpers.
- Update tests to target v8 APIs (`TextureSource`, adapter setup, environment extension).
- Run `npm run lint`, `npm run test`, and basic import/require smoke checks.

## Acceptance Criteria
- `npm run build` and `npm run test` pass against PixiJS v8.
- Creating a Pixi renderer in Node uses the Node environment extension (no `document/window` errors).
- Assets loaded via `Assets.load` produce working `Texture` instances backed by `NodeCanvasElement`.
- Headless WebGL rendering produces buffers/images without regressions.

## TODO Status
- [x] Upgrade dependencies & imports to `pixi.js` v8.
- [x] Replace adapter wiring with `DOMAdapter` workflow.
- [x] Implement Node environment extension for detection.
- [x] Port texture/canvas integration to `TextureSource` model.
- [x] Refresh asset loaders/parsers for v8.
- [x] Harden Node shims & globals.
- [x] Cleanup deprecated exports/tests and validate (lint/test).
- [x] Regenerate lockfile & run test suite (gl rebuilt with system deps).
