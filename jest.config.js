const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/src/components/**/*{.spec.tsx,spec.ts}',
    '<rootDir>/src/hooks/**/*{.spec.tsx,spec.ts}',
    '<rootDir>/src/utils/**/*{.spec.tsx,spec.ts}',
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: [
    '**/src/components/**/*{.ts,.js,.jsx,.tsx}',
    '**/src/hooks/**/*{.ts,.js,.jsx,.tsx}',
    '**/src/utils/**/*{.ts,.js,.jsx,.tsx}',
    '!**/node_modules/',
  ],
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/tests/__mocks__/svgrMock.tsx',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
