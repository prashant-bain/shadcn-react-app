# @bain/shadcn-components

Custom shadcn/ui components library with overridden CSS styles for the Bain Design System.

## Installation

```bash
npm install @bain/shadcn-components
```

### GitHub Packages Authentication

Since this package is hosted on GitHub Packages, you need to authenticate:

1. Create a `.npmrc` file in your project root:

```
@bain:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Generate a GitHub Personal Access Token with `read:packages` scope

## Usage

### Import Components

```tsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Input,
  Label 
} from '@bain/shadcn-components'
```

### Import Styles

Import the custom CSS in your main application file:

```tsx
import '@bain/shadcn-components/styles.css'
```

### Example

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@bain/shadcn-components'
import '@bain/shadcn-components/styles.css'

function App() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Components

- **Button** - Various button variants (default, secondary, destructive, outline, ghost, link)
- **Card** - Card container with Header, Title, Description, Content, Footer, and Action
- **Input** - Form input field
- **Label** - Form label component

## Custom Styling

This package includes custom CSS with:
- Bain Design System color palette
- Custom Tailwind configuration
- Overridden shadcn/ui styles
- Dark mode support

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build package
npm run build

# Publish to GitHub Packages
npm publish
```

## Author

prashant-bain
