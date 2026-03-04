# CI/CD

## Workflows

### ci.yml — Continuous Integration

Triggered on every push and pull request to any branch.

**Jobs:**

1. **lint-and-typecheck** — Runs ESLint and TypeScript type checking across the monorepo
2. **test** — Runs unit tests with Vitest
3. **build** — Validates the production build succeeds

```
Push / PR
   │
   ├── lint-and-typecheck
   │       npm run lint
   │       npm run type-check
   │
   ├── test (needs: lint-and-typecheck)
   │       npm run test
   │
   └── build (needs: lint-and-typecheck)
           npm run build
```

### cd.yml — Continuous Deployment

**Deploy to Staging** — Triggered on push to `main`:
1. Builds the application
2. Deploys to Vercel (preview URL)
3. Aliases to `staging.zzp-platform.nl`

**Deploy to Production** — Triggered on version tags (`v*`):
1. Builds the application
2. Deploys to Vercel production
3. Creates a GitHub Release with auto-generated release notes

```
Push to main ──► Deploy to Staging ──► staging.zzp-platform.nl

Tag v1.2.3 ─────► Deploy to Production ──► zzp-platform.nl
                        └──► GitHub Release created
```

### provision-client.yml — Client Provisioning

Triggered by:
- `repository_dispatch` event (from the payment webhook)
- Manual `workflow_dispatch` (for testing/support)

**Steps:**

1. **Create Vercel Project** — Creates a new project with client environment variables
2. **Register DNS** — Runs `scripts/register-dns.mjs` to add CNAME records in Cloudflare
3. **Deploy Template** — Deploys the chosen template to Vercel
4. **Update Order Status** — Calls the internal API to mark the order as `deployed`
5. **Notify** — Logs completion

## Required Secrets

Configure these in GitHub Settings → Secrets:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel API token with deploy access |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Zone:Edit |
| `CLOUDFLARE_ZONE_ID` | Cloudflare zone ID |
| `APP_URL` | Production app URL (`https://zzp-platform.nl`) |
| `INTERNAL_API_SECRET` | Secret for internal API calls |

## Environment Protection

GitHub Environments are used for deployment gates:

- **staging** — No approval required, auto-deploys on `main` push
- **production** — Requires manual approval, deploys on version tags

## Versioning

Create a new production release:

```bash
git tag v1.2.3
git push origin v1.2.3
```

This triggers `cd.yml` to deploy to production and create a GitHub Release.
