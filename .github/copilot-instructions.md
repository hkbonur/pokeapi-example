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

## Development Guidelines

### Code Structure

- Keep components modular and follow the established project structure
- Use TypeScript for type safety across the codebase
- Follow existing patterns for hooks, utilities, and component implementations

### React Best Practices

**Component Structure:**

- Use function declarations for components: `function ComponentName(props: Props) { ... }`
- Import React as a namespace: `import React from 'react'`
- For single-component files, always name the props interface `Props`
- For files with multiple components, use descriptive names: `ButtonProps`, `HeaderProps`, etc.
- Filename should be pascal case and match the main component name: `MyComponent.tsx`
- Do not reference props via destructuring: `const { prop1, prop2 } = props`. Always use `props.prop1`, `props.prop2`

**Composition & Architecture:**

- Prefer composition over prop drilling
- Extract custom hooks to separate business logic from view logic
- Keep components focused on presentation when possible
- Use hooks for stateful logic and side effects
- Always export component functions (no default exports) or export separately at the bottom of the file

**Code Organization:**

```typescript
// Good example structure
import React from 'react'

interface Props {
  title: string
  onSubmit: () => void
}

export function MyComponent(props: Props) {
  const logic = useMyComponentLogic(props)
  const [ state, setState ] = React.useState(null)

  React.useEffect(() => {
    // side effects here
  }, [state, props.title])

  return (
    // JSX here
  )
}
```

**Custom Hooks:**

- Extract complex logic into custom hooks (e.g., `useMyComponentLogic`)
- Name hooks with the `use` prefix
- Keep view components clean and declarative
- Test hooks independently when they contain significant logic
