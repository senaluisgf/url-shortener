// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'test/**',
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.e2e-spec.ts',
      'prisma/migrations/**',
      '.husky/**',
      '.git/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.log',
      '.env*',
      'Dockerfile',
      '.dockerignore',
      'package.json',
      'package-lock.json',
      'README.md',
      '*.md',
      '.DS_Store',
      'Thumbs.db',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);
