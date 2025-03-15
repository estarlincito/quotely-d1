/** @type {import("eslint").Linter.Config} */
import { baseConfig } from '@estarlincito/eslint';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        Bindings: 'readonly',
        D1Database: 'readonly',
      },
    },
  },
];
