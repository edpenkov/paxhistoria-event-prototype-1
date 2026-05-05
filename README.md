# Event Stack Motion Prototype

## What This Prototype Demonstrates

- Event review panel motion
- Bottom-anchored event stack behavior
- Collapsed history rows plus active viewport transition

## Key Files

- `src/App.jsx`
- `src/App.css`

## Motion Model

- `historyStack` grows upward as events are advanced
- Newly collapsed row animates height `0 -> 74px`
- `activeViewport` height changes via explicit per-event `expandedHeight` values
- Active event content slides/fades between outgoing and incoming layers
- No `height: auto` animation
- No DOM measurement for viewport sizing

## Motion Tokens

- Duration: `500ms`
- History opacity delay: `100ms`
- Easing: `cubic-bezier(0.2, 0, 0.1, 1)`

## Notes For Developers

- Use this as a motion reference prototype, not production architecture
- If production needs dynamic content height, use explicit heights or FLIP/layout animation
- Do not animate to `height: auto`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
