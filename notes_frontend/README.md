# Smart Notes Manager - React Frontend

This is a React (Vite) frontend converted from the original Astro template. It preserves the design language (theme toggle, background blur, modern light style) and provides scaffolding for the main user flows:
- User authentication (login/signup scaffold)
- Notes CRUD (client-side for now)
- Search and tagging
- Responsive layout with sidebar (navigation/tags), header (search/profile), and main content

## Scripts

- npm install
- npm start          # Start dev server on http://localhost:3000
- npm run build      # Production build
- npm run preview    # Preview the build
- npm run lint       # Lint project

## Structure

- index.html
- src/
  - main.tsx (entry)
  - App.tsx (router + layout)
  - styles/global.css (theme variables and layout)
  - components/
    - ThemeToggle.tsx
    - BackgroundBlur.tsx
    - layout/
      - Header.tsx
      - Sidebar.tsx
      - Layout.tsx
  - pages/
    - AuthPage.tsx
    - NotesPage.tsx
  - assets/
    - background.svg
    - astro.svg (example asset)

## Next steps

- Wire authentication and notes CRUD to backend via HTTP REST.
- Replace client-side state with calls to backend services and add proper error handling and loading states.
- Implement persistent storage for notes and tags once the backend API is ready.
