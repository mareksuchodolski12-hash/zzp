#!/usr/bin/env node
/**
 * Script to sync Sanity CMS schema to a project.
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=xxx node sync-cms-schema.mjs --project-id <projectId>
 *
 * This script:
 * 1. Validates the schema definitions
 * 2. Extracts schema to JSON
 * 3. Syncs to the target Sanity project
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const args = parseArgs(process.argv.slice(2));
const projectId = args['project-id'] ?? process.env.SANITY_PROJECT_ID;

if (!projectId) {
  console.error('Provide --project-id or set SANITY_PROJECT_ID environment variable');
  process.exit(1);
}

const authToken = process.env.SANITY_AUTH_TOKEN;
if (!authToken) {
  console.error('SANITY_AUTH_TOKEN environment variable is required');
  process.exit(1);
}

const cmsDir = resolve(import.meta.dirname, '../apps/cms');

console.log(`Syncing CMS schema to project: ${projectId}`);

// Step 1: Build the CMS to validate TypeScript
console.log('Step 1: Validating schema...');
try {
  execSync('npm run build', { cwd: cmsDir, stdio: 'inherit' });
  console.log('Schema validation passed');
} catch {
  console.error('Schema validation failed');
  process.exit(1);
}

// Step 2: Extract schema
console.log('\nStep 2: Extracting schema...');
try {
  execSync(
    `SANITY_STUDIO_PROJECT_ID=${projectId} npm run schema:extract`,
    { cwd: cmsDir, stdio: 'inherit' }
  );
  console.log('Schema extracted');
} catch {
  console.error('Schema extraction failed');
  process.exit(1);
}

// Step 3: Deploy the studio
console.log('\nStep 3: Deploying Sanity Studio...');
try {
  execSync(
    `SANITY_STUDIO_PROJECT_ID=${projectId} npx sanity deploy --no-confirm`,
    { cwd: cmsDir, stdio: 'inherit' }
  );
  console.log('Studio deployed successfully');
} catch {
  console.error('Studio deployment failed');
  process.exit(1);
}

console.log(`\nCMS schema synced successfully to project: ${projectId}`);
console.log(`Studio URL: https://${projectId}.sanity.studio`);

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
