import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "mjs"],
  testRegex: "((\\.|/*.)(test))\\.ts?$",
};

export default config;
