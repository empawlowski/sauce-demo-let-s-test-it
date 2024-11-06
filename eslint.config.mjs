import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'allure-report/**',
      'allure-results/**',
      'package-lock.json',
      'playwright-report/**',
      'playwright-results/**',
      'test-results/**',
      'test-report/**',
      'src/output/**',
    ],
  },
  { files: ['**/*.ts'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  { rules: { 'no-console': ['off', { allow: ['warn', 'error'] }] } },
  ...tseslint.configs.recommended,
];
