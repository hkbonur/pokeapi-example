import { defineConfig } from "orval";

export default defineConfig({
  pokeapi: {
    output: {
      target: "src/generated/pokeapi.ts",
      schemas: "src/generated/schemas",
      client: "react-query",
      mock: false,
      baseUrl: "https://pokeapi.co/api/v2/",
    },
    input: {
      target: "./src/openapi/pokeapi.yml",
    },
  },
});
