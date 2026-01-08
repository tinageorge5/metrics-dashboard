import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // ✅ this defines window, document, fetch, etc.
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ needed for JSX
        },
      },
    },
    plugins: {
      react,
      'react-hooks': hooks,
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
