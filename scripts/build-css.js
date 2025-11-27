import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the index.css file
const css = readFileSync('./src/index.css', 'utf8');

// Create dist directory if it doesn't exist
mkdirSync('./dist', { recursive: true });

// Write to dist/styles.css
writeFileSync('./dist/styles.css', css);

console.log('✓ CSS built successfully');
