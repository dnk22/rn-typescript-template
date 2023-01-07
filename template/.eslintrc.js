module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'prettier', '@react-native-community'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'prettier/prettier': [
          'error',
          {},
          {
            usePrettierrc: false,
            singleQuote: true,
            parser: 'flow',
          },
        ],
      },
    },
  ],
};
