// Mock Expo modules
jest.mock("expo-constants", () => ({
  executionEnvironment: "standalone",
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children }) => children,
}));

// Global test setup
global.__DEV__ = true;
