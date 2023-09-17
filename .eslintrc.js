module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "max-len": [
      "error",
      {
        code: 140,
        ignoreComments: true,
      },
    ],
    "import/prefer-default-export": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-shadow": "off",
    "no-plusplus": "off",
    "no-unused-vars": "off",
    "consistent-return": "off",
    "prefer-promise-reject-errors": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
  },
};
