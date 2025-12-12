# Installing @prashant-bain/shadcn-components

Complete guide to install and use the package in your project.

---

## Prerequisites

- Node.js and npm installed
- React project (v18 or v19)
- GitHub Personal Access Token with `read:packages` scope

### Get GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `read:packages`
4. Generate and copy the token

---

## Installation Steps

### Step 1: Create `.npmrc` file

In your project root, create a `.npmrc` file:

```
@prashant-bain:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
```

**Important:** Replace `YOUR_GITHUB_TOKEN_HERE` with your actual GitHub token.

**Security:** Add `.npmrc` to your `.gitignore` to avoid committing the token:

```
echo ".npmrc" >> .gitignore
```

### Step 2: Install the package

```bash
npm install @prashant-bain/shadcn-components
```

Or install a specific version:

```bash
npm install @prashant-bain/shadcn-components@1.0.4
```

### Step 3: Verify installation

Check your `package.json`:

```json
{
  "dependencies": {
    "@prashant-bain/shadcn-components": "^1.0.4"
  }
}
```

---

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
  CardAction,
  Input,
  Label 
} from '@prashant-bain/shadcn-components'
```

### Import Styles

**Important:** Import the CSS in your main app file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@prashant-bain/shadcn-components/styles.css'
```

---

## Example Usage

### Basic Button

```tsx
import { Button } from '@prashant-bain/shadcn-components'
import '@prashant-bain/shadcn-components/styles.css'

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Login Card Example

```tsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAction,
  Input,
  Label 
} from '@prashant-bain/shadcn-components'
import '@prashant-bain/shadcn-components/styles.css'

function LoginForm() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
```

### Simple Card Example

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@prashant-bain/shadcn-components'
import '@prashant-bain/shadcn-components/styles.css'

function SimpleCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
    </Card>
  )
}
```

---

## Available Components

### Button
Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`  
Sizes: `default`, `sm`, `lg`, `icon`

```tsx
<Button variant="outline" size="lg">Large Outline Button</Button>
```

### Card Components
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardAction` - Action button in header (right side)
- `CardContent` - Main content area
- `CardFooter` - Footer section

### Input
Standard form input field

```tsx
<Input type="text" placeholder="Enter text" />
```

### Label
Form label component

```tsx
<Label htmlFor="input-id">Label Text</Label>
```

---

## Styling

The package includes:
- **Bain Design System colors** (blue, cyan, green palettes)
- **Tailwind CSS v4** integration
- **Dark mode support** (use `dark` class on parent)
- **Custom CSS variables** for theming

### Using Custom Colors

The package includes custom color variables you can use:

```tsx
<div className="bg-blue-50 text-blue-600">
  Custom colored content
</div>
```

Available color families:
- Black: `black-100`, `black-50`, `black-hover`
- White: `white-0`, `white-hover`
- Blue: `blue-10` through `blue-100` (with hover variants)
- Cyan: `cyan-10` through `cyan-100` (with hover variants)
- Green: `green-10` through `green-100` (with hover variants)

---

## Requirements

Your project should have:
- **React** v18 or v19
- **Tailwind CSS** (the package uses Tailwind utility classes)

If you don't have Tailwind CSS, the styles are still included in the CSS file, but custom styling may not work as expected.

---

## TypeScript Support

The package includes full TypeScript definitions. No additional `@types` packages needed.

```tsx
import type { ComponentProps } from 'react'
import { Button } from '@prashant-bain/shadcn-components'

type ButtonProps = ComponentProps<typeof Button>

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

---

## Troubleshooting

### "404 Not Found" when installing

**Solution:** 
- Verify `.npmrc` is in project root
- Check GitHub token has `read:packages` scope
- Ensure token is correct and not expired

### Components not styled correctly

**Solution:**
- Make sure you imported the CSS: `import '@prashant-bain/shadcn-components/styles.css'`
- Verify import is in a component that's rendered (preferably in `main.tsx` or `App.tsx`)

### TypeScript errors

**Solution:**
- Install React types: `npm install -D @types/react @types/react-dom`
- Check TypeScript version (should be 5.x)

### Permission denied when installing

**Solution:**
- Verify your GitHub token has correct permissions
- Try regenerating the token with `read:packages` scope

---

## Update Package

To update to the latest version:

```bash
npm update @prashant-bain/shadcn-components
```

Or install a specific version:

```bash
npm install @prashant-bain/shadcn-components@1.0.5
```

---

## Package Info

- **Name:** `@prashant-bain/shadcn-components`
- **Current Version:** 1.0.4
- **Registry:** GitHub Packages
- **Repository:** https://github.com/prashant-bain/shadcn-react-app
- **License:** MIT

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/prashant-bain/shadcn-react-app/issues
- Package URL: https://github.com/prashant-bain/shadcn-react-app/packages

---

## Quick Start Checklist

- [ ] Create `.npmrc` with GitHub token
- [ ] Run `npm install @prashant-bain/shadcn-components`
- [ ] Import CSS: `import '@prashant-bain/shadcn-components/styles.css'`
- [ ] Import components: `import { Button, Card } from '@prashant-bain/shadcn-components'`
- [ ] Use components in your JSX
- [ ] Add `.npmrc` to `.gitignore`

Done! You're ready to use the components. 🎉
