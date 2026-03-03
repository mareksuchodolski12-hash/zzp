#!/usr/bin/env node
/**
 * Script to initialize a new Sanity CMS project for a client.
 * Usage: node scripts/init-client-cms.mjs <clientSlug> <projectName>
 */

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [, , clientSlug, projectName] = process.argv;

if (!clientSlug || !projectName) {
  console.error('Usage: node init-client-cms.mjs <clientSlug> <projectName>');
  process.exit(1);
}

const SANITY_AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN;
if (!SANITY_AUTH_TOKEN) {
  console.error('SANITY_AUTH_TOKEN environment variable is required');
  process.exit(1);
}

console.log(`Creating Sanity project for client: ${clientSlug}`);

// Create a new Sanity project via the Sanity API
const response = await fetch('https://api.sanity.io/v2021-06-07/projects', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    displayName: projectName,
    organizationId: process.env.SANITY_ORGANIZATION_ID,
  }),
});

if (!response.ok) {
  const error = await response.text();
  console.error(`Failed to create Sanity project: ${error}`);
  process.exit(1);
}

const project = await response.json();
console.log(`Created project: ${project.id}`);

// Create a production dataset
const datasetResponse = await fetch(
  `https://api.sanity.io/v2021-06-07/projects/${project.id}/datasets/production`,
  {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
    },
  },
);

if (!datasetResponse.ok) {
  console.error('Failed to create dataset');
  process.exit(1);
}

console.log('Created production dataset');

// Create a client-specific .env file
const envContent = `SANITY_STUDIO_PROJECT_ID=${project.id}
SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=${project.id}
NEXT_PUBLIC_SANITY_DATASET=production
`;

const clientEnvPath = join(process.cwd(), `clients/${clientSlug}.env`);
mkdirSync(join(process.cwd(), 'clients'), { recursive: true });
writeFileSync(clientEnvPath, envContent);

console.log(`Client environment saved to: ${clientEnvPath}`);
console.log(`\nSanity project initialized successfully!`);
console.log(`Project ID: ${project.id}`);
console.log(`Studio URL: https://${project.id}.sanity.studio`);
