/** @type {import("eslint").Linter.Config} */
import { baseConfig } from '@estarlincito/eslint';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        C: 'readonly',
        D1Database: 'readonly',
        ExportedHandler: 'readonly',
        Env: 'readonly',
      },
    },
  },
];
