import { defineConfig } from "orval";

export default defineConfig({
  pokeapi: {
    output: {
      target: "src/generated/pokeapi.ts",
      schemas: "src/generated/schemas",
      client: "react-query",
      mock: false,
    },
    input: {
      target: "./src/openapi/pokeapi.yml",
    },
  },
});
