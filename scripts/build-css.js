import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the index.css file
let css = readFileSync('./src/index.css', 'utf8');

// Remove @import statements that won't work in node_modules
css = css.replace(/@import\s+"tailwindcss";?\n?/g, '');
css = css.replace(/@import\s+"tw-animate-css";?\n?/g, '');

// Add a comment at the top
css = `/* Styles from @prashant-bain/shadcn-components */\n/* Note: This package requires Tailwind CSS to be configured in your project */\n\n${css}`;

// Create dist directory if it doesn't exist
mkdirSync('./dist', { recursive: true });

// Write to dist/styles.css
writeFileSync('./dist/styles.css', css);

console.log('✓ CSS built successfully (removed @import statements)');
