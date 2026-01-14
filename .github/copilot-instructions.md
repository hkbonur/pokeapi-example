# The goal of this project

The goal is to create a simple website in React that uses the Pokemon API: https://pokeapi.co. The Pokemon API is an open API that gives you access to various information about Pokemon.

Functional requirements:

- A search field that lets you search for a pokemon by name. If the search doesn't match any pokemon, you should get an error message.
- When you have selected a pokemon, you should be able to see an image of the pokemon, and some information about it presented in a clear way with a design of your choice. Feel free to use your imagination, but the starting point can be a Pokemon card. Here you can for example show the image, the type, some "Abilities", and maybe 2-3 "Moves" that the pokemon can learn.
- Optional: Feel free to extend with other functions as well. For example, autocomplete on search, animations, favorites function, team builder, or other things.

# Project setup

This project uses following libraries/tools:

- React
- TanStack Router
- TanStack Query
- Orval (to generate the API client from the OpenAPI spec)
- Tailwind CSS
- Vite
- Vitest (for testing)

Orval is used to generate the API client from the OpenAPI spec located in `/src/pokeapi.yml`. The generated files are located in `/src/generated/`. Use already generated API client functions to fetch data from the API.
