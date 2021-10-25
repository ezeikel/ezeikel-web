module.exports = {
  moduleNameMapper: {
    "\\.css$": require.resolve("./style-mock.js"),
  },
  watchPlugins: [
    "jest-watch-select-projects",
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
