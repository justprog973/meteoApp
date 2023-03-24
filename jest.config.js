module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-native-linear-gradient)',
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

//react-native-vector-icons

/**
 *
 * 'node_modules/(?!(@react-native|react-native|react-native-linear-gradient|@react-native-community|@react-navigation))',
 *  */
