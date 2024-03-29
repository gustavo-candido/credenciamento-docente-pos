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
    "^@FacomNormCred/(.*)$": "<rootDir>/src/FacomLattesExtractor/$1",
    "^@ProdArticle/(.*)$": "<rootDir>/src/prod_article/$1",
    "^@typeorm/(.*)$": "<rootDir>/src/typeorm/$1",
  },
};
