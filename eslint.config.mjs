import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.ts'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  { rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] } },
  ...tseslint.configs.recommended,
];
