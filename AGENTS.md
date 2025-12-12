# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/` (TypeScript). Adapter code for headless/node rendering is in `src/adapter/`; filters in `src/filters.ts`; the package entry point is `src/index.ts`.
- Tests live in `test/` using Jest/ts-jest plus import/require smoke checks.
- Build output lands in `lib/` (CJS `index.js`, ESM `index.mjs`, typings) via `@pixi/extension-scripts`.

## Build, Test, and Development Commands
- `npm install` — install deps (Node 16+; native libs for `gl`/`canvas`).
- `npm run build` — bundle to `lib/` (CJS/ESM/typings) via `xs build`.
- `npm run watch` — incremental rebuilds.
- `npm run test` — Jest suite (`xs test`).
- `npm run coverage` — Jest with coverage.
- `npm run lint` / `npm run lint:fix` — ESLint/Prettier from `@pixi/extension-scripts`.
- `npm run validate` — smoke check for import/require entry points.

## Coding Style & Naming Conventions
- TypeScript throughout; prefer named exports and barrel re-exports.
- Indentation: 4 spaces; keep semicolons/trailing commas per ESLint.
- Filenames: PascalCase for classes, camelCase for helpers; avoid default exports.
- Add short JSDoc only when behavior is non-obvious.

## Testing Guidelines
- Framework: Jest with `ts-jest`. Add tests in `test/`, mirroring the source name.
- Keep tests deterministic; mock canvas/GL instead of real GPU.
- Run `npm run test` before PRs; add coverage when fixing adapters/loader code.

## Commit & Pull Request Guidelines
- Use conventional types (`fix`, `feat`, `chore`, `docs`, `test`, `build`); releases use tag-style messages (e.g., `7.3.0`).
- Keep commits small; add a brief rationale when touching rendering or loader behavior.
- PRs: include summary, linked issue, tests run, and platform notes (e.g., macOS vs Linux). Add screenshots/logs only when debugging install/runtime issues.

## Security & Environment Notes
- Node 16+ required. Headless CI should use `xvfb-run node …` when GL/canvas needs a display.
- For local native builds, install dependencies listed in the README (`cairo`, `pango`, `libpng`, etc.). Avoid committing generated `lib/` output.
