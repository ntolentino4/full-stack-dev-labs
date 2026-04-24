# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


## Auth and Application Deployment Lab 5.2 documentation

# What change I wanted to make in my application?

For this lab, I wanted to improve how my application handles data fetching from 
the backend. Previously, I was using useEffect, useState, and a manual refreshKey 
system to reload data after changes. While this worked, it was not very scalable 
and required extra logic to manage updates. I refactored my application to use 
TanStack Query to manage server state more effectively and reduce the need for 
manual data synchronization.

## What tools I used to make this change?

I used TanStack Query (@tanstack/react-query) to manage server state in my React 
application. This library provides hooks such as useQuery for fetching data and 
invalidateQueries for refreshing data after mutations. I integrated a 
QueryClientProvider at the root of my app and replaced my existing useEffect 
calls with useQuery. This allowed me to simplify data fetching logic and improve 
how my app handles caching and updates.

## How this change affects the user experience?

This change improves the user experience by making the application feel faster 
and more responsive. Data is now cached automatically, so repeated visits to 
pages do not require unnecessary network requests. When users add new employees
or roles, the UI updates immediately through query invalidation, without requiring 
manual refresh logic. Additionally, loading and error states are handled more 
cleanly, providing better feedback to users when data is being fetched or if 
something goes wrong.

## How this change affects my understanding of the application?

This change helped me better understand the difference between client state and 
server state. Previously, I treated all data as local state, but TanStack Query 
showed me that server data should be managed differently. I learned how caching, 
invalidation, and background refetching work, which simplifies application logic 
and improves performance. This also changed how I think about scaling applications, 
as managing server state properly becomes more important in larger projects.