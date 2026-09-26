# Vivi AI — React + TypeScript migration

This project migrates the supplied Vivi HTML prototype into a Vite + React + TypeScript application with React Router, centralized route constants, isolated source content, calculator business logic, responsive CSS, and a Not Found route.

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```

## Architecture

- `src/app` — application shell and router
- `src/components` — reusable migration boundary and site chrome
- `src/content` — source-of-truth prototype fragments
- `src/lib` — routes and calculator logic
- `src/pages` — reserved for incremental conversion of source fragments into native React page components
- `src/styles` — original source CSS plus responsive/application overrides

The supplied prototype was intentionally preserved as an isolated content boundary so visual/content fidelity is maintained while routing and interaction behavior move into React. This gives the team a safe incremental path to replace individual legacy fragments with native React components without changing routes or user-facing content.
