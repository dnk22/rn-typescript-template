module.exports = {
  root: true,
  extends: '@',
  plugins: ['@typescript-eslint'],
  extends: ['prettier', '@react-native-community'],
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
