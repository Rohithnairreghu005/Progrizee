import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/** Shared ESLint flat config for TypeScript workspaces. */
export default tseslint.config(
  { ignores: ['dist/**', '.next/**', 'coverage/**', '*.config.*', 'next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
);
