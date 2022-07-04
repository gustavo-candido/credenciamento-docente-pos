module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@FacomLattesExtractor/(.*)$": "<rootDir>/src/FacomLattesExtractor/$1",
  },
};
