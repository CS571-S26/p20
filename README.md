# MadisonEats

A client-side React app built with Vite. No backend; compatible with GitHub Pages.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (or the next available port).

## Build

```bash
npm run build
```

Output goes to the `dist` folder.

## Deploy to GitHub Pages

1. Push the repo to GitHub (e.g. `username/MadisonEats`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to the `main` branch; the workflow will build and deploy. The app uses `base: '/MadisonEats/'`, so the site will be at `https://username.github.io/MadisonEats/`.

## Project structure

- `src/components/` – Reusable UI components
- `src/pages/` – Page-level components
- `src/data/` – Static data (no API keys)
- `src/utils/` – Helper functions
