# GitHub Package Publishing Guide

## Complete Guide: Creating and Publishing @bain/shadcn-components

This document outlines all steps from creating the package to publishing it on GitHub Packages.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Package Structure Setup](#package-structure-setup)
3. [Configuration Files](#configuration-files)
4. [Building the Package](#building-the-package)
5. [Publishing to GitHub Packages](#publishing-to-github-packages)
6. [Using the Package](#using-the-package)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js (v18+) and npm installed
- Git repository initialized
- GitHub account with repository access
- GitHub Personal Access Token (PAT) with `write:packages` and `read:packages` scopes

### Creating a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "npm-publish")
4. Select scopes:
   - `write:packages` (to publish packages)
   - `read:packages` (to install packages)
5. Click "Generate token" and save it securely

---

## Package Structure Setup

### 1. Project Structure

```
shadcn-react-app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   └── index.ts          # Component exports
│   ├── lib/
│   │   └── utils.ts
│   └── index.css              # Custom styles
├── scripts/
│   └── build-css.js           # CSS build script
├── .github/
│   └── workflows/
│       └── publish.yml        # GitHub Actions workflow
├── dist/                      # Build output (generated)
├── package.json
├── tsconfig.lib.json          # TypeScript config for library
├── vite.config.lib.ts         # Vite config for library build
├── .npmrc                     # npm registry configuration
└── PACKAGE_README.md          # Package documentation
```

### 2. Component Export File

Create `src/components/index.ts`:

```typescript
// UI Components
export * from './ui/button'
export * from './ui/card'
export * from './ui/input'
export * from './ui/label'

// Utils
export { cn } from '@/lib/utils'
```

---

## Configuration Files

### 3. Update package.json

Key changes to `package.json`:

```json
{
  "name": "@bain/shadcn-components",
  "version": "1.0.0",
  "description": "Custom shadcn/ui components with overridden CSS styles",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": [
    "dist",
    "PACKAGE_README.md"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/prashant-bain/shadcn-react-app.git"
  },
  "scripts": {
    "build": "npm run build:lib && npm run build:css",
    "build:lib": "tsc && vite build --config vite.config.lib.ts",
    "build:css": "node scripts/build-css.js",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

**Important fields:**
- `name`: Scoped package name (@username/package-name)
- `main`, `module`, `types`: Entry points for the package
- `exports`: Defines what can be imported from the package
- `files`: What gets included when publishing
- `publishConfig`: Tells npm to publish to GitHub Packages
- `peerDependencies`: React should be provided by the consuming app

### 4. Create .npmrc

```
@bain:registry=https://npm.pkg.github.com
```

This tells npm that packages under `@bain` scope should be fetched from GitHub Packages.

### 5. Create tsconfig.lib.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/components/**/*", "src/lib/**/*"],
  "exclude": ["src/App.tsx", "src/main.tsx", "node_modules", "dist"]
}
```

This config:
- Generates TypeScript declarations (.d.ts files)
- Only includes component files (not the demo app)
- Outputs to `dist/` directory

### 6. Create vite.config.lib.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'ShadcnComponents',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

This config:
- Builds the library (not the app)
- Marks React as external (won't bundle it)
- Outputs ES modules to `dist/`

### 7. Create scripts/build-css.js

```javascript
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

// Read the index.css file
const css = readFileSync('./src/index.css', 'utf8');

// Create dist directory if it doesn't exist
mkdirSync('./dist', { recursive: true });

// Write to dist/styles.css
writeFileSync('./dist/styles.css', css);

console.log('✓ CSS built successfully');
```

This script copies your custom CSS to the dist folder.

### 8. Create .github/workflows/publish.yml

```yaml
name: Publish Package

on:
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@bain'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build package
        run: npm run build
      
      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This GitHub Action:
- Triggers on release creation or manual workflow dispatch
- Builds and publishes the package automatically
- Uses GitHub's built-in `GITHUB_TOKEN` for authentication

---

## Building the Package

### 9. Test Local Build

```bash
# Install dependencies
npm install

# Build the package
npm run build
```

This will:
1. Run TypeScript compiler to generate `.d.ts` files
2. Run Vite to bundle the components
3. Copy CSS to dist folder

**Expected output in `dist/`:**
```
dist/
├── index.js        # Bundled components
├── index.d.ts      # TypeScript declarations
└── styles.css      # Your custom CSS
```

### 10. Verify Build Output

Check that `dist/` contains:
- `index.js` - The component bundle
- `index.d.ts` - TypeScript type definitions
- `styles.css` - Your custom styles

---

## Publishing to GitHub Packages

### Method 1: Automatic Publishing via GitHub Release (Recommended)

1. **Commit and push all changes:**
   ```bash
   git add .
   git commit -m "Configure package for publishing"
   git push origin main
   ```

2. **Create a GitHub Release:**
   - Go to `https://github.com/prashant-bain/shadcn-react-app/releases`
   - Click "Create a new release"
   - Click "Choose a tag" → Type `v1.0.0` → "Create new tag: v1.0.0 on publish"
   - Release title: `v1.0.0`
   - Description: Describe what's in this release
   - Click "Publish release"

3. **GitHub Actions will automatically:**
   - Build the package
   - Publish to GitHub Packages
   - You can monitor progress in the "Actions" tab

### Method 2: Manual Publishing

1. **Authenticate with GitHub Packages:**
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```
   - Username: Your GitHub username
   - Password: Your GitHub Personal Access Token (not your GitHub password!)
   - Email: Your email

2. **Publish the package:**
   ```bash
   npm publish
   ```

3. **Verify publication:**
   - Go to your GitHub repository
   - Click the "Packages" section on the right sidebar
   - You should see `@bain/shadcn-components` listed

---

## Using the Package

### Installing in Another Project

1. **Create .npmrc in the consuming project:**
   ```
   @bain:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

2. **Install the package:**
   ```bash
   npm install @bain/shadcn-components
   ```

### Using the Components

```tsx
// Import components
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

// Import styles (in your main app file)
import '@bain/shadcn-components/styles.css'

function App() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  )
}
```

---

## Troubleshooting

### Common Issues

#### 1. "404 Not Found" when installing

**Problem:** Package not found or authentication failed

**Solutions:**
- Verify `.npmrc` is configured correctly in the consuming project
- Check that your GitHub token has `read:packages` scope
- Verify the package name matches exactly (including the `@username` scope)
- Make sure you're authenticated: `npm login --registry=https://npm.pkg.github.com`

#### 2. "Permission denied" when publishing

**Problem:** No permission to publish to the registry

**Solutions:**
- Verify your GitHub token has `write:packages` scope
- Check that you own the repository or have collaborator access
- Ensure the package name uses your GitHub username: `@your-username/package-name`

#### 3. Build fails with module resolution errors

**Problem:** TypeScript can't find modules

**Solutions:**
- Verify `tsconfig.lib.json` has correct path mappings
- Check that all imports use the `@/` alias correctly
- Run `npm install` to ensure all dependencies are installed

#### 4. Components not rendering correctly in consuming app

**Problem:** Styles not applied or components broken

**Solutions:**
- Ensure you're importing the CSS: `import '@bain/shadcn-components/styles.css'`
- Check that the consuming app has Tailwind CSS configured
- Verify React version compatibility (18.x or 19.x)

#### 5. "Cannot find module" errors after installing

**Problem:** TypeScript types not found

**Solutions:**
- Check that `dist/index.d.ts` exists in your published package
- Verify `types` field in package.json points to correct file
- Try `npm install @types/react @types/react-dom`

---

## Version Management

### Updating the Package

1. **Make your changes to components**

2. **Update version in package.json:**
   - Patch (bug fixes): `1.0.0` → `1.0.1`
   - Minor (new features): `1.0.0` → `1.1.0`
   - Major (breaking changes): `1.0.0` → `2.0.0`

   ```bash
   npm version patch  # or minor, or major
   ```

3. **Commit and push:**
   ```bash
   git push origin main --tags
   ```

4. **Create new release on GitHub** with the new version tag

5. **Consumers can update:**
   ```bash
   npm update @bain/shadcn-components
   ```

---

## Best Practices

1. **Semantic Versioning:** Follow semver for version numbers
2. **Changelog:** Keep a CHANGELOG.md documenting changes
3. **Testing:** Test the package locally before publishing using `npm link`
4. **Documentation:** Keep PACKAGE_README.md up to date
5. **Peer Dependencies:** Don't bundle React - let consumers provide it
6. **Tree Shaking:** Use named exports for better tree shaking
7. **TypeScript:** Always include type definitions
8. **CI/CD:** Use GitHub Actions for consistent builds

---

## Quick Reference Commands

```bash
# Build package locally
npm run build

# Publish manually
npm publish

# Install in another project
npm install @bain/shadcn-components

# Update version
npm version patch|minor|major

# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com
```

---

## Summary

You've successfully set up a publishable npm package on GitHub Packages that includes:

✅ Custom shadcn/ui components  
✅ Overridden CSS with Bain Design System colors  
✅ TypeScript support with full type definitions  
✅ Automatic publishing via GitHub Actions  
✅ ES module format for modern bundlers  
✅ Proper peer dependencies for React  
✅ Documentation for consumers  

The package is now ready to be used across multiple projects while maintaining a single source of truth for your component library!
