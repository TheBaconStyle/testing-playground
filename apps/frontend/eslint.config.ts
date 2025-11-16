import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: ['next/core-web-vitals', 'next/typescript'],

    rules: {
      'react/no-children-prop': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['.next/**/*'],
  },
]);
