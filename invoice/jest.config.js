module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  setupFiles: ["<rootDir>/tests/setup.ts"],
  clearMocks: true
};