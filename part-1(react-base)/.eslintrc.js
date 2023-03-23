module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['prettier'],
  rules: {
    'import/order': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
};
