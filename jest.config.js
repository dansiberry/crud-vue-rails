module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testMatch: ['**/spec/javascript/*.spec.js'],
  verbose: true,
  transformIgnorePatterns: [
    "/node_modules/(?!vue).+\\.js$"
  ]
}
