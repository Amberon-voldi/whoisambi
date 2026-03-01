# whoisambi

Personal portfolio website for **Ambi (Ambuj Pandey)**, built with React + Vite, featuring advanced motion design, a pixel-art identity system, and a full avatar crafting experience.

## Highlights

- Animated single-page portfolio (Hero, About, Skills, Projects, Contact)
- 3D + parallax hero interactions using Framer Motion
- Pixel anime avatar component integrated across sections
- Dedicated **Craft Avatar** page with deep customization options
- Avatar export support in **PNG** and **SVG** formats
- Content-driven setup via `src/data/portfolio.json`

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Router DOM

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Project Structure

- `src/components` — portfolio UI sections and reusable components
- `src/pages/AvatarCrafter.jsx` — avatar builder experience
- `src/data/portfolio.json` — personal info, skills, projects, experience
- `src/data/avatarParts.js` — avatar customization data and rendering helpers

## Customization Notes

- Update your portfolio content in `src/data/portfolio.json`.
- To tweak avatar options (styles/colors/layers), edit `src/data/avatarParts.js`.

## Status

Actively evolving portfolio project with ongoing design and interaction upgrades.
