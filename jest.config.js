module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  moduleNameMapper: {
    "^@/domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@/infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@/application/(.*)$": "<rootDir>/src/application/$1",
    "^@/presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  testEnvironment: "node",
};
