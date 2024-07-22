import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import { addHook } from 'pirates';
import { transformSync } from 'esbuild';

const require = createRequire(import.meta.url);
const tsconfig = require('./tsconfig.json');

const tsExts = new Set(['.ts', '.tsx']);
const tsxExts = new Set(['.tsx']);

addHook((code, filename) => {
  const ts = tsExts.has(path.extname(filename));
  return transformSync(code, {
    loader: ts ? 'ts' : 'tsx',
    target: tsconfig.compilerOptions.target,
    format: 'cjs',
    sourcemap: 'inline',
    jsx: tsxExts.has(path.extname(filename)) ? 'transform' : undefined
  }).code;
}, { exts: ['.ts', '.tsx'] });

const filePath = fileURLToPath(import.meta.url.replace(/loader\.mjs$/, 'src/index.ts'));
import(filePath);
