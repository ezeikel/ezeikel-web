import path from 'path';

export default {
  rootDir: path.join(__dirname, '..'),
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
