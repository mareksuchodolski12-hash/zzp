#!/usr/bin/env node
/**
 * Script to generate a new client website from a template.
 *
 * Usage:
 *   node generate-client.mjs --template business --slug jansen-consulting \
 *     --business-name "Jansen Consulting" --email jan@jansen.nl \
 *     --phone "+31612345678" --domain jansenconsulting.nl \
 *     [--description "..."]
 */

import { execSync } from 'node:child_process';
import { mkdirSync, cpSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = parseArgs(process.argv.slice(2));

const requiredArgs = ['template', 'slug', 'business-name', 'email', 'phone', 'domain'];
for (const arg of requiredArgs) {
  if (!args[arg]) {
    console.error(`Missing required argument: --${arg}`);
    process.exit(1);
  }
}

const VALID_TEMPLATES = ['business', 'freelancer', 'portfolio'];
if (!VALID_TEMPLATES.includes(args.template)) {
  console.error(`Invalid template. Choose from: ${VALID_TEMPLATES.join(', ')}`);
  process.exit(1);
}

const rootDir = resolve(import.meta.dirname, '..');
const templateDir = join(rootDir, 'templates', args.template);
const outputDir = join(rootDir, 'clients', args.slug);

if (!existsSync(templateDir)) {
  console.error(`Template directory not found: ${templateDir}`);
  process.exit(1);
}

if (existsSync(outputDir)) {
  console.error(`Client directory already exists: ${outputDir}`);
  process.exit(1);
}

console.log(`Generating client website for: ${args['business-name']}`);
console.log(`Template: ${args.template}`);
console.log(`Output: ${outputDir}`);

// Copy template to client directory
mkdirSync(outputDir, { recursive: true });
cpSync(templateDir, outputDir, { recursive: true });

// Create .env.local with client data
const envContent = `NEXT_PUBLIC_BUSINESS_NAME=${args['business-name']}
NEXT_PUBLIC_CONTACT_EMAIL=${args.email}
NEXT_PUBLIC_CONTACT_PHONE=${args.phone}
NEXT_PUBLIC_DOMAIN=${args.domain}
NEXT_PUBLIC_DESCRIPTION=${args.description ?? ''}
`;

writeFileSync(join(outputDir, '.env.local'), envContent);
console.log('Created .env.local with client data');

// Update package.json with client name
const pkgPath = join(outputDir, 'package.json');
const pkg = JSON.parse(await import('node:fs').then(m => m.readFileSync(pkgPath, 'utf-8')));
pkg.name = `@zzp/client-${args.slug}`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`\nClient website generated successfully!`);
console.log(`Directory: ${outputDir}`);
console.log(`\nNext steps:`);
console.log(`  1. cd clients/${args.slug}`);
console.log(`  2. npm install`);
console.log(`  3. npm run dev`);
console.log(`  4. Deploy with: vercel deploy --prod`);

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (value && !value.startsWith('--')) {
        result[key] = value;
        i++;
      } else {
        result[key] = true;
      }
    }
  }
  return result;
}
