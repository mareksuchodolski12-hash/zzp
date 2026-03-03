# ZZP Website Platform

A production-ready SaaS platform that sells ready-made websites for ZZP (self-employed) professionals in the Netherlands. Built as a monorepo with modern tooling.

## Overview

ZZP Website Platform automates the delivery of professional websites for freelancers and self-employed professionals. After payment, a client website is automatically provisioned, configured, and deployed — all within 24 hours.

## Monorepo Structure

```
zzp/
├── apps/
│   ├── web/                    # Next.js 15 marketing site + API backend
│   └── cms/                    # Sanity CMS studio + schemas
├── templates/
│   ├── business/               # Business / consultant template
│   ├── freelancer/             # Freelancer / creative template
│   └── portfolio/              # Portfolio / photographer template
├── infra/
│   ├── modules/                # Reusable Terraform modules
│   │   ├── vercel/             # Vercel project provisioning
│   │   ├── cloudflare/         # DNS + SSL
│   │   ├── neon/               # PostgreSQL (Neon)
│   │   ├── sanity/             # Sanity CMS project
│   │   ├── grafana/            # Grafana Cloud monitoring
│   │   └── sops/               # SOPS + age secrets management
│   └── envs/
│       ├── prod/               # Production environment
│       └── staging/            # Staging environment
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, typecheck, test, build
│       ├── cd.yml              # Deploy to staging/prod
│       └── provision-client.yml # Automated client provisioning
├── scripts/
│   ├── generate-client.mjs     # Generate a client website locally
│   ├── sync-cms-schema.mjs     # Sync CMS schema to a project
│   └── register-dns.mjs        # Register DNS + SSL via Cloudflare
└── docs/
    ├── architecture.md
    ├── ci-cd.md
    ├── infra.md
    └── templates.md
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, Tailwind CSS, shadcn/ui |
| Backend | Next.js API Routes + Server Actions |
| Database | PostgreSQL via Neon |
| CMS | Sanity v3 |
| Payments | Mollie (iDEAL, Bancontact, creditcard) |
| Deployments | Vercel |
| DNS/SSL | Cloudflare |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |
| Monitoring | Grafana Cloud |
| Secrets | SOPS + age |
| Monorepo | Turborepo |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/your-org/zzp.git
cd zzp
npm install
```

### Development

```bash
cd apps/web
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

### Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string (fallback) |
| `SUPABASE_DATABASE_URL` | Supabase PostgreSQL connection string (primary) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `MOLLIE_API_KEY` | Mollie API key (use `test_` prefix for testing) |
| `VERCEL_TOKEN` | Vercel API token |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token |
| `INTERNAL_API_SECRET` | Long random secret for internal API auth (fallback) |
| `MODERATOR_TOKEN` | Primary token for moderator/internal deployment endpoints |

### Database Setup

```bash
psql $DATABASE_URL -f apps/web/db/001_initial_schema.sql
```

## Workflows

### Order Flow

1. Customer visits the site, browses templates and pricing
2. Customer fills the order form and pays via Mollie
3. Mollie sends a webhook to `/api/payments/webhook`
4. The payment handler triggers `/api/deployments`
5. A Vercel project is created with client environment variables
6. The template is deployed to Vercel
7. DNS is configured via Cloudflare

### Client Provisioning

```bash
node scripts/generate-client.mjs \
  --template business \
  --slug jansen-consulting \
  --business-name "Jansen Consulting" \
  --email jan@jansen.nl \
  --phone "+31612345678" \
  --domain jansenconsulting.nl
```

## Documentation

- [Architecture](docs/architecture.md)
- [CI/CD](docs/ci-cd.md)
- [Infrastructure](docs/infra.md)
- [Templates](docs/templates.md)

## License

MIT
