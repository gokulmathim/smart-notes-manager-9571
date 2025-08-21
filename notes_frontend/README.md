# Notes Frontend (React + Vite)

This app is a React rewrite of the previous Astro frontend. It preserves the modern, light theme with dark-mode toggle and provides a layout ready for:
- User authentication
- Notes CRUD
- Search
- Tagging & categorization
- Responsive design (sidebar + header + content)

Scripts:
- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — production build in `dist/`
- `npm run preview` — preview production build

Tech:
- React 18 + Vite 5
- React Router 6
- TypeScript

Environment variables:
- If backend URLs or keys are required, request to add them to the .env and access via import.meta.env (do not hardcode).

Project structure:
- `src/main.tsx` — entry (renders App)
- `src/App.tsx` — layout + routes
- `src/components/ThemeToggle.tsx` — light/dark theme switch
- `src/components/Welcome.tsx` — welcome landing
- `src/styles/global.css` — theme variables and global styles
