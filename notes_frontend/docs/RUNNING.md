# Running the React Frontend

- Install dependencies:
  npm install

- Start development server:
  npm start
  App runs at http://localhost:3000

- Build production:
  npm run build
  Then preview:
  npm run preview

If you see ESLint parsing errors for TSX, ensure the installed dev dependencies include:
- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin
And that eslint.config.mjs exists at project root.
