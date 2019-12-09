module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'/*, 'mocha'*/],
  rules: {
    'prettier/prettier': ['error'],
  },
  env: {
    browser: true,
    node: true,
  },
  // extends: ['plugin:mocha/recommended'],
};