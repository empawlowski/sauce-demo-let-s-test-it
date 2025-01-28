import pluginJs from '@eslint/js';
import eslintPluginPlaywright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
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
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  eslintPluginPlaywright.configs['flat/recommended'],
  {
    rules: {
      'playwright/no-nested-step': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/no-conditional-in-test': 'off',
    },
    settings: {
      playwright: {
        globalAliases: {
          test: ['setup'],
        },
      },
    },
  },
  eslintPluginPrettierRecommended,
];
