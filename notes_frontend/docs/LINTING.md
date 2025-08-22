# Linting Notes

- ESLint is configured to parse TypeScript/TSX using @typescript-eslint/parser with a dedicated tsconfig.eslint.json.
- Declaration files (*.d.ts) are ignored to avoid parser issues.
- If you encounter performance problems with type-aware linting, remove `parserOptions.project` in eslint.config.mjs to disable type-aware rules.
