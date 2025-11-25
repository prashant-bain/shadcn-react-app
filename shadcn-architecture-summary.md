# shadcn/ui Architecture & Token Model

(Tailwind + Radix + CVA)

A. Overview

-   shadcn/ui = Copy-paste components, not a package.
-   Built with React + Tailwind + Radix Primitives
-   Uses CVA (Class Variance Authority) for variants and
    'tailwind-merge / clsx' for class handling.
-   'Fully customizable' we own the source code.

------------------------------------------------------------------------

B. Architecture Summary

-   Behavior layer: Radix Primitives (`@radix-ui/react-*`) for accessibility & headless UI.
-   Styling layer: Tailwind utilities + semantic tokens (via CSS variables).
-   Variants layer: `cva()` for size/state/variant props (typed, composable).
-   Composition: `Slot` / `asChild` enables semantic, flexible DOM structures.

------------------------------------------------------------------------

C. Token Model

-   "Semantic tokens via CSS variables:"
    -   `--background`, `--foreground`, `--primary`, `--secondary`, `--border`, `--input`, `--ring`, etc.
-   `--radius` defines border radius globally.
-   Theme scopes: `:root` for light, `.dark` for dark modes.
-   Tailwind v4: introduces `@theme`** for static design tokens. combine with CSS vars for runtime theming.

------------------------------------------------------------------------

D. Customization

-   Enable CSS variables via `components.json` (SET `tailwind.cssVariables: true`).
-   Override tokens- in global CSS or per-theme scopes.
-   Edit CVA definitions in each component to add/rename variants.
-   Prefer semantic tokens avoid hard-coded hex/spacing.

------------------------------------------------------------------------

E. Dependencies

-   React / Next.js
-   "@radix-ui/react-" (primitives + Slot)
-   Tailwind v3/v4, `tailwindcss-animate`
-   class-variance-authority (CVA)
-   lucide-react (optional icons)**

------------------------------------------------------------------------

F. Best Practices to follow

-   Keep tokens semantic
-   Use "CVA" for variant logic.
-   Compose with "Radix Slot/asChild" for clean markup.(if required)
-   Avoid inline colors rely on tokens. (no inline css strictly)
