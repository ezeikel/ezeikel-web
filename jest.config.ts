import common from './test/jest-common';

export default {
  ...common, // TODO: does this even need to be imported here? Already imported in client
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 24,
      functions: 29,
      lines: 29,
    },
  },
  projects: ['./test/jest.lint.ts', './test/jest.client.ts'],
};
