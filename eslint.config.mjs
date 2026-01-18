import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
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

// Plugins already provided by eslint-config-next that should not be redefined
const pluginsFromNext = new Set([
  'react',
  'react-hooks',
  'jsx-a11y',
  '@next/next',
]);

// Filter out plugins already provided by eslint-config-next to avoid conflicts
const filterDuplicatePlugins = (configArray) =>
  configArray.map((config) => {
    if (!config.plugins) return config;
    const filteredPlugins = Object.fromEntries(
      Object.entries(config.plugins).filter(
        ([name]) => !pluginsFromNext.has(name),
      ),
    );
    return { ...config, plugins: filteredPlugins };
  });

const nextConfig = [
  // NOTE: react, react-hooks, jsx-a11y, and @next/next plugins are already
  // provided by eslint-config-next. We only add airbnb's rules, not plugins.
  // airbnb next recommended config (filtered to remove duplicate plugins)
  ...filterDuplicatePlugins(configs.next.recommended),
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
  // Project-wide rule overrides for common patterns
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Allow _id, _type, _client, _resend etc (Sanity + singleton patterns)
      'no-underscore-dangle': 'off',
      // Allow console in server-side code (API routes, actions)
      'no-console': 'warn',
      // Allow for...of loops (common in async code)
      'no-restricted-syntax': 'off',
      // Allow continue statements
      'no-continue': 'off',
      // Allow await in loops (needed for rate limiting)
      'no-await-in-loop': 'off',
      // Allow ++ operator
      'no-plusplus': 'off',
      // Allow param reassign for specific patterns
      'no-param-reassign': ['error', { props: false }],
      // Allow use before define for variables (style objects, etc.) and functions
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, variables: false },
      ],
      // Allow underscore naming for private vars
      '@typescript-eslint/naming-convention': 'off',
      // Allow nested ternaries (common in React)
      'no-nested-ternary': 'off',
      // Allow single export without default
      'import-x/prefer-default-export': 'off',
      // Allow promise executor return (common pattern)
      'no-promise-executor-return': 'off',
      // parseInt radix is optional in modern JS
      radix: 'off',
    },
  },
  // Relax jsx-a11y for forms (many are handled by shadcn/ui)
  {
    files: ['**/*.tsx'],
    rules: {
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
    },
  },
  // Email templates use style objects defined after JSX
  {
    files: ['**/emails/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
  // Sanity schemas
  {
    files: ['**/sanity/**/*.ts'],
    rules: {
      'no-nested-ternary': 'off',
    },
  },
  // React Three Fiber components use custom JSX properties
  {
    files: ['**/components/**/*.tsx'],
    rules: {
      'react/no-unknown-property': 'off',
    },
  },
  // Allow array index keys in specific cases
  {
    files: ['**/*.tsx'],
    rules: {
      'react/no-array-index-key': 'warn',
      'react/button-has-type': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
    },
  },
  // Handle Next.js virtual modules like 'server-only'
  {
    files: ['**/lib/**/*.ts'],
    rules: {
      'import-x/no-unresolved': ['error', { ignore: ['^server-only$'] }],
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
