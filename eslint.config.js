// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/__tests__/**/*",
      "**/jest-setup.js",
      "**/jest.config.js",
    ],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        test: "readonly",
        global: "readonly",
      },
    },
  },
  {
    plugins: {
      "react-native": reactNativePlugin,
    },
    rules: {
      // React Native specific rules
      "react-native/no-unused-styles": "error",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
      "react-native/no-raw-text": [
        "error",
        {
          skip: ["ThemedText"],
        },
      ],
      "react-native/split-platform-components": "error",

      // Custom rule to catch unsupported StyleSheet properties
      "no-restricted-syntax": [
        "error",
        {
          selector: 'Property[key.name="gap"]',
          message:
            'The "gap" property is not supported in React Native StyleSheet. Use margin or padding instead.',
        },
        {
          selector: 'Property[key.name="backdropFilter"]',
          message:
            'The "backdropFilter" property is not supported in React Native StyleSheet.',
        },
        {
          selector: 'Property[key.name="boxShadow"]',
          message:
            'The "boxShadow" property is not supported in React Native StyleSheet. Use shadowColor, shadowOffset, shadowOpacity, and shadowRadius instead.',
        },
      ],
    },
  },
]);
