# Architecture

## System Overview

The ZZP Website Platform is a SaaS system that automates the creation and deployment of professional websites for Dutch self-employed professionals (ZZP'ers).

```
┌──────────────────────────────────────────────────────────────┐
│                        Internet                              │
└───────────────────────────┬──────────────────────────────────┘
                            │
              ┌─────────────▼──────────────┐
              │      Cloudflare CDN/WAF     │
              │   zzp-platform.nl + SSL     │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │     Vercel Edge Network     │
              │                            │
              │  ┌──────────────────────┐  │
              │  │  apps/web (Next.js)  │  │
              │  │                      │  │
              │  │  • Landing page      │  │
              │  │  • Pricing page      │  │
              │  │  • Templates page    │  │
              │  │  • Order form        │  │
              │  │  • API routes        │  │
              │  └──────────────────────┘  │
              └──────┬─────────────┬───────┘
                     │             │
        ┌────────────▼─┐    ┌──────▼────────────┐
        │  Neon (Neon) │    │   Cloudflare DNS   │
        │  PostgreSQL  │    │   + SSL routing    │
        └──────────────┘    └───────────────────┘
```

## Component Descriptions

### apps/web (Next.js 15)

The main application serves both the marketing website and the backend API.

**Frontend pages:**
- `/` — Landing page with hero, features, testimonials, CTA
- `/pricing` — Pricing plans
- `/templates` — Template showcase
- `/order` — Order form

**API routes:**
- `POST /api/orders` — Create a new order + Mollie payment
- `GET /api/orders?id=` — Fetch order status
- `POST /api/payments/webhook` — Mollie payment webhook
- `POST /api/deployments` — Trigger client provisioning
- `GET /api/deployments?orderId=` — Fetch deployment status

### Payment Flow

```
Customer → Order Form → POST /api/orders
                               │
                               ▼
                    Mollie.createPayment()
                               │
                               ▼
                    Customer → Mollie checkout → iDEAL/Bancontact
                               │
                               ▼ (webhook)
                    POST /api/payments/webhook
                               │
                               ▼
                    processMollieWebhook()
                               │
                    ┌──────────▼──────────┐
                    │  payment.status     │
                    │  = 'paid'           │
                    └──────────┬──────────┘
                               │
                               ▼
                    POST /api/deployments
                               │
                               ▼
                    triggerDeployment()
                    ├── createVercelProject()
                    └── deployToVercel()
```

### Database Schema

Two tables manage the platform lifecycle:

- **orders** — Customer order records, linked to Mollie payments
- **deployments** — Vercel deployment tracking per order

### Client Website Templates

Each template is a standalone Next.js application under `templates/`:

- **business** — Clean, professional look for consultants and coaches
- **freelancer** — Dark, modern portfolio for creatives
- **portfolio** — Minimal, elegant layout for photographers/writers

Templates are configured entirely via environment variables, making them trivially reusable for any client.

## Security

- API routes that perform privileged operations require `Authorization: Bearer <INTERNAL_API_SECRET>`
- Mollie webhook validation via payment ID lookup (not signature-based for simplicity — upgrade to signature verification in production)
- All secrets managed via SOPS + age encryption
- Cloudflare proxies all traffic, hiding origin IPs
- SSL enforced at Cloudflare level (Full SSL mode)
