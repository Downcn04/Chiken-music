module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    'eslint-config-prettier',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        // Prettier 相关配置，可以根据需要进行定制
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  plugins: ['prettier'],
};
