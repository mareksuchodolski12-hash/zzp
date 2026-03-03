import type { TemplateType } from './orders';

export interface DeploymentInput {
  orderId: string;
  template: TemplateType;
  domain: string;
  clientData: {
    businessName: string;
    fullName: string;
    email: string;
    phone: string;
    description?: string;
  };
}

export interface Deployment {
  id: string;
  orderId: string;
  vercelProjectId?: string;
  vercelDeploymentId?: string;
  url?: string;
  status: 'queued' | 'building' | 'ready' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export async function triggerDeployment(input: DeploymentInput): Promise<Deployment> {
  const deployment: Deployment = {
    id: crypto.randomUUID(),
    orderId: input.orderId,
    status: 'queued',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Create Vercel project
  const vercelProject = await createVercelProject(input);
  deployment.vercelProjectId = vercelProject.id;

  // Trigger Vercel deployment
  const vercelDeployment = await deployToVercel(vercelProject.id, input);
  deployment.vercelDeploymentId = vercelDeployment.id;
  deployment.url = vercelDeployment.url;
  deployment.status = 'building';

  // Persist to database
  await persistDeployment(deployment);

  return deployment;
}

export async function getDeploymentByOrderId(orderId: string): Promise<Deployment | null> {
  return fetchDeploymentFromDb(orderId);
}

// ---------------------------------------------------------------------------
// Vercel API helpers
// ---------------------------------------------------------------------------

async function createVercelProject(input: DeploymentInput) {
  const projectName = `zzp-${input.clientData.businessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)}`;

  const response = await fetch('https://api.vercel.com/v9/projects', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectName,
      framework: 'nextjs',
      environmentVariables: [
        { key: 'NEXT_PUBLIC_BUSINESS_NAME', value: input.clientData.businessName, target: ['production'] },
        { key: 'NEXT_PUBLIC_CONTACT_EMAIL', value: input.clientData.email, target: ['production'] },
        { key: 'NEXT_PUBLIC_CONTACT_PHONE', value: input.clientData.phone, target: ['production'] },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create Vercel project: ${await response.text()}`);
  }

  return response.json();
}

async function deployToVercel(projectId: string, input: DeploymentInput) {
  const repoUrl = `${process.env.GITHUB_TEMPLATE_REPO_URL}/templates/${input.template}`;

  const response = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectId,
      gitSource: {
        type: 'github',
        repoId: process.env.GITHUB_TEMPLATE_REPO_ID,
        ref: 'main',
      },
      projectSettings: {
        rootDirectory: `templates/${input.template}`,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to deploy to Vercel: ${await response.text()}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Database helpers
// ---------------------------------------------------------------------------

async function persistDeployment(deployment: Deployment): Promise<void> {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO deployments (
      id, order_id, vercel_project_id, vercel_deployment_id, url, status, created_at, updated_at
    ) VALUES (
      ${deployment.id}, ${deployment.orderId}, ${deployment.vercelProjectId ?? null},
      ${deployment.vercelDeploymentId ?? null}, ${deployment.url ?? null},
      ${deployment.status}, ${deployment.createdAt.toISOString()},
      ${deployment.updatedAt.toISOString()}
    )
  `;
}

async function fetchDeploymentFromDb(orderId: string): Promise<Deployment | null> {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`SELECT * FROM deployments WHERE order_id = ${orderId} LIMIT 1`;

  if (!rows.length) return null;

  const row = rows[0];
  return {
    id: row.id,
    orderId: row.order_id,
    vercelProjectId: row.vercel_project_id,
    vercelDeploymentId: row.vercel_deployment_id,
    url: row.url,
    status: row.status,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
