import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals.js';
import nextTypescript from 'eslint-config-next/typescript.js';
import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export const projectRoot = path.resolve('.');
export const gitignorePath = path.resolve(projectRoot, '.gitignore');

const jsConfig = [
  // eslint recommended rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // stylistic plugin
  plugins.stylistic,
  // import x plugin
  plugins.importX,
  // airbnb base recommended config
  ...configs.base.recommended,
];

const nextConfig = [
  // react plugin
  plugins.react,
  // react hooks plugin
  plugins.reactHooks,
  // react jsx a11y plugin
  plugins.reactA11y,
  // next plugin
  plugins.next,
  // airbnb next recommended config
  ...configs.next.recommended,
];

const typescriptConfig = [
  // typescript eslint plugin
  plugins.typescriptEslint,
  // airbnb base typescript config
  ...configs.base.typescript,
  // airbnb next typescript config
  ...configs.next.typescript,
];

const prettierConfig = [
  // prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/require-default-props': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/ui/**', 'next-auth.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/function-component-definition': 'off',
    },
  },
  {
    files: ['**/ui/**'],
    rules: {
      'arrow-body-style': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'import-x/prefer-default-export': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];

export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  // ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // javascript config
  ...jsConfig,
  // next config
  ...nextConfig,
  // typescript config
  ...typescriptConfig,
  // prettier config
  ...prettierConfig,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];
