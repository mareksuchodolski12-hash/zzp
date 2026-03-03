# Infrastructure

The infrastructure is managed with Terraform and organized as reusable modules with environment-specific configurations.

## Directory Structure

```
infra/
├── modules/
│   ├── vercel/         # Vercel project provisioning
│   ├── cloudflare/     # DNS records + SSL settings
│   ├── neon/           # PostgreSQL database (Neon)
│   ├── sanity/         # Sanity CMS project
│   ├── grafana/        # Grafana Cloud monitoring stack
│   └── sops/           # SOPS configuration generation
└── envs/
    ├── prod/           # Production infrastructure
    └── staging/        # Staging infrastructure
```

## Modules

### vercel

Provisions a Vercel project with configurable environment variables.

**Inputs:**
- `vercel_api_token` — Vercel API token
- `project_name` — Project name in Vercel
- `framework` — Framework type (default: `nextjs`)
- `team_id` — Vercel team ID (optional)
- `environment_variables` — Map of env vars

**Outputs:** `project_id`, `project_name`

### cloudflare

Creates DNS records and configures SSL for a domain.

**Creates:**
- CNAME `@` → Vercel edge
- CNAME `www` → Vercel edge
- SSL mode: Full
- Always use HTTPS: on
- Automatic HTTPS rewrites: on

**Inputs:**
- `cloudflare_api_token`
- `zone_id`
- `domain`
- `vercel_cname_target` (default: `cname.vercel-dns.com`)

### neon

Provisions a Neon PostgreSQL project via the Neon REST API using Terraform's `local-exec` provisioner.

**Inputs:**
- `neon_api_key`
- `project_name`
- `region` (default: `aws-eu-west-1`)
- `database_name` (default: `zzp`)

### sanity

Creates a new Sanity CMS project via the Sanity Management API.

**Inputs:**
- `sanity_auth_token`
- `project_name`
- `organization_id` (optional)

### grafana

Creates a Grafana Cloud stack for monitoring.

**Inputs:**
- `grafana_cloud_api_key`
- `grafana_cloud_org`
- `stack_name`

**Outputs:** `grafana_url`, `stack_id`

### sops

Generates a `.sops.yaml` configuration file for encrypting secrets with age.

**Inputs:**
- `age_public_keys` — List of age public keys
- `project_name`

## Environments

### prod

```bash
cd infra/envs/prod
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

### staging

```bash
cd infra/envs/staging
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

## State Management

Terraform state is stored in S3:
- Bucket: `zzp-terraform-state`
- Encryption: AES-256
- Separate state files for prod and staging

## Secrets Management

Secrets are managed with [SOPS](https://github.com/getsops/sops) + [age](https://github.com/FiloSottile/age).

### Setup

```bash
# Install age
brew install age

# Generate a key pair
age-keygen -o ~/.config/sops/age/keys.txt

# Get your public key
cat ~/.config/sops/age/keys.txt | grep "# public key:"
```

### Encrypting secrets

```bash
# Encrypt a .env file
sops -e apps/web/.env.production > apps/web/.env.production.enc

# Decrypt
sops -d apps/web/.env.production.enc
```

## Client Infrastructure

Each client website is provisioned dynamically (not via Terraform) through the `provision-client.yml` GitHub Actions workflow. The provisioning:

1. Creates a Vercel project via API
2. Creates a Sanity project via API
3. Creates DNS records via Cloudflare API
4. Deploys the template

See [ci-cd.md](ci-cd.md) for the full provisioning flow.
