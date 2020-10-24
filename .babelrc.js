module.exports = {
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: {
          proposals: true,
          version: 3,
        },
      },
    ],
  ],
  presets: [
    [
      "@babel/env",
      {
        debug: false,
        modules: false,
      },
    ],
    "@babel/react",
  ],
};
