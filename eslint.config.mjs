import eslintJsPlugin from '@eslint/js';
import typeScriptEsLintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts'],
    ignores: [
      'package-lock.json',
      'playwright-report/**',
      'test-results/**',
      'test-download/**',
      'test-upload/**',
      'src/assets/documents/**',
      'src/assets/images/**',
      'src/download/**',
      'src/upload/**',
      'src/output/**',
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      prettier,
      playwright,
      '@typescript-eslint': typeScriptEsLintPlugin,
      typeScriptEsLintPlugin,
    },
    rules: {
      ...eslintJsPlugin.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'off',
      ...typeScriptEsLintPlugin.configs['eslint-recommended'].rules,
      'typeScriptEsLintPlugin/explicit-function-return-type': 'error',
      'typeScriptEsLintPlugin/no-unused-vars': 'error',
      ...playwright.configs.recommended.rules,
      'playwright/no-nested-step': 'off',
      ...prettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    },
  },
];
