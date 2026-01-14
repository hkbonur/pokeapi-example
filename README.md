Welcome to your new TanStack app!

# Getting Started

To run this application:

```bash
pnpm install
pnpm start
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

# Dev

This project uses pokeapi.co as a demo API. You can find the API documentation [here](https://pokeapi.co/docs/v2).
The OpenAPI spec can be found in /src/pokeapi.yml. [Orval](https://orval.dev/) is used to generate the API client (using Tanstack Query as the data fetching library) from the OpenAPI spec.
To regenerate the API client after making changes to the OpenAPI spec, run:

```bash
pnpm orval
```
