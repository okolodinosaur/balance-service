import { defineConfig } from 'eslint/config';
import ts from '@typescript-eslint/parser';

export default defineConfig([
  {
    languageOptions: {
      parser: ts,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    files: ['**/*.ts', '**/*.cjs', '**/*.mjs'],
    rules: {
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
    },
  },
]);
