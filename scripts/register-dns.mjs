#!/usr/bin/env node
/**
 * Script to register DNS records and configure SSL via Cloudflare API.
 *
 * Usage:
 *   node register-dns.mjs --domain example.nl --zone-id <zoneId> [--subdomain www]
 *
 * Environment variables:
 *   CLOUDFLARE_API_TOKEN  - Cloudflare API token with Zone:Edit permission
 *   CLOUDFLARE_ZONE_ID    - (optional) Can also be passed as --zone-id argument
 */

const args = parseArgs(process.argv.slice(2));

const domain = args.domain;
const zoneId = args['zone-id'] ?? process.env.CLOUDFLARE_ZONE_ID;
const apiToken = args['api-token'] ?? process.env.CLOUDFLARE_API_TOKEN;
const cname = args.cname ?? 'cname.vercel-dns.com';

if (!domain) {
  console.error('Missing required argument: --domain');
  process.exit(1);
}
if (!zoneId) {
  console.error('Missing required: --zone-id or CLOUDFLARE_ZONE_ID');
  process.exit(1);
}
if (!apiToken) {
  console.error('Missing required: --api-token or CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${apiToken}`,
  'Content-Type': 'application/json',
};

console.log(`Registering DNS for domain: ${domain}`);

// Create/update DNS records
const records = [
  { type: 'CNAME', name: '@', content: cname, proxied: true },
  { type: 'CNAME', name: 'www', content: cname, proxied: true },
];

for (const record of records) {
  console.log(`  Setting ${record.type} ${record.name} -> ${record.content}`);

  // Check if record exists
  const listResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=${record.type}&name=${record.name === '@' ? domain : `${record.name}.${domain}`}`,
    { headers }
  );

  const listData = await listResponse.json();

  if (listData.result?.length > 0) {
    // Update existing record
    const recordId = listData.result[0].id;
    const updateResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          type: record.type,
          name: record.name,
          content: record.content,
          proxied: record.proxied,
        }),
      }
    );
    const updateData = await updateResponse.json();
    if (!updateData.success) {
      console.error(`  Failed to update record: ${JSON.stringify(updateData.errors)}`);
      process.exit(1);
    }
    console.log(`  Updated existing record: ${recordId}`);
  } else {
    // Create new record
    const createResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          type: record.type,
          name: record.name,
          content: record.content,
          proxied: record.proxied,
        }),
      }
    );
    const createData = await createResponse.json();
    if (!createData.success) {
      console.error(`  Failed to create record: ${JSON.stringify(createData.errors)}`);
      process.exit(1);
    }
    console.log(`  Created record: ${createData.result.id}`);
  }
}

// Configure SSL settings
console.log('\nConfiguring SSL settings...');
const sslResponse = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/ssl`,
  {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ value: 'full' }),
  }
);
const sslData = await sslResponse.json();
if (!sslData.success) {
  console.warn('Failed to configure SSL settings');
} else {
  console.log('SSL mode set to: full');
}

// Enable HTTPS redirect
const httpsResponse = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/always_use_https`,
  {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ value: 'on' }),
  }
);
const httpsData = await httpsResponse.json();
if (!httpsData.success) {
  console.warn('Failed to enable HTTPS redirect');
} else {
  console.log('Always use HTTPS: enabled');
}

console.log(`\nDNS registration complete for: ${domain}`);

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
