import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Disables ESLint rules that conflict with Prettier
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }], // Enforce Prettier settings
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes in ESLint
    },
  },
];
