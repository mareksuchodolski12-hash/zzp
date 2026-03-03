# Templates

The platform includes three professionally designed website templates for different ZZP professional profiles.

## Available Templates

### 1. Business Template (`templates/business`)

**Target audience:** Consultants, coaches, trainers, advisors

**Design:** Clean white layout with blue accents. Professional and trustworthy.

**Sections:**
- Navigation bar (sticky)
- Hero section with tagline and CTA
- Services section (3 service cards)
- About section with personal description
- Contact section with email and phone
- Footer

**Customization via environment variables:**
```env
NEXT_PUBLIC_BUSINESS_NAME=Jansen Consulting
NEXT_PUBLIC_TAGLINE=Professionele dienstverlening voor uw succes
NEXT_PUBLIC_CONTACT_EMAIL=jan@jansen.nl
NEXT_PUBLIC_CONTACT_PHONE=+31 6 12 34 56 78
NEXT_PUBLIC_DESCRIPTION=Met jarenlange ervaring...
```

---

### 2. Freelancer Template (`templates/freelancer`)

**Target audience:** Designers, developers, creative professionals

**Design:** Dark theme with purple accents. Modern and creative.

**Sections:**
- Navigation bar (fixed overlay)
- Full-screen hero with animated intro
- Work showcase grid (4 project cards)
- Skills tags cloud
- Contact section
- Footer

**Customization via environment variables:**
```env
NEXT_PUBLIC_BUSINESS_NAME=Mark Jansen
NEXT_PUBLIC_CONTACT_EMAIL=hello@markjansen.nl
NEXT_PUBLIC_CONTACT_PHONE=+31 6 12 34 56 78
NEXT_PUBLIC_DESCRIPTION=Ik ben een creatieve freelancer...
```

---

### 3. Portfolio Template (`templates/portfolio`)

**Target audience:** Photographers, writers, artists, visual creators

**Design:** Minimal, elegant with generous whitespace. Lets the work speak.

**Sections:**
- Navigation bar (clean, minimal)
- Hero with large name display
- Gallery grid (6 portfolio items)
- About section with profile photo placeholder
- Contact section on dark background
- Footer

**Customization via environment variables:**
```env
NEXT_PUBLIC_BUSINESS_NAME=Sophie van der Berg
NEXT_PUBLIC_CONTACT_EMAIL=hello@sophie.nl
NEXT_PUBLIC_CONTACT_PHONE=+31 6 12 34 56 78
NEXT_PUBLIC_DESCRIPTION=Ik ben een professionele fotograaf...
```

---

## Using Templates

### Local Development

```bash
# Generate a client website from a template
node scripts/generate-client.mjs \
  --template business \
  --slug jansen-consulting \
  --business-name "Jansen Consulting" \
  --email jan@jansen.nl \
  --phone "+31612345678" \
  --domain jansenconsulting.nl \
  --description "Zakelijk advies voor MKB"

# Navigate to the generated client directory
cd clients/jansen-consulting
npm install
npm run dev
```

### Deploying a Template

Templates can be deployed directly to Vercel:

```bash
cd templates/business

# Set environment variables
vercel env add NEXT_PUBLIC_BUSINESS_NAME
vercel env add NEXT_PUBLIC_CONTACT_EMAIL
# ...

# Deploy
vercel deploy --prod
```

## Adding a New Template

1. Create a new directory under `templates/`:

```bash
mkdir -p templates/my-template/app
mkdir -p templates/my-template/components
mkdir -p templates/my-template/public
```

2. Copy the config files from an existing template:

```bash
cp templates/business/package.json templates/my-template/
cp templates/business/tailwind.config.js templates/my-template/
cp templates/business/postcss.config.js templates/my-template/
cp templates/business/next.config.ts templates/my-template/
cp templates/business/tsconfig.json templates/my-template/
```

3. Update `package.json` with the new template name.

4. Create the app pages and components.

5. Add the template to the templates showcase in `apps/web/app/(marketing)/templates/page.tsx`.

6. Update the order form in `apps/web/components/marketing/order-form.tsx` to include the new template option.

## Template Architecture

Each template is a self-contained Next.js 15 application:

```
templates/<name>/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page (imports all sections)
│   └── globals.css     # Tailwind base styles
├── components/
│   ├── index.tsx       # All component implementations
│   ├── nav.tsx         # Re-exports Nav component
│   ├── hero.tsx        # Re-exports Hero component
│   └── ...             # Other section re-exports
├── public/             # Static assets
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.ts
└── tsconfig.json
```

All client-specific data flows in exclusively through `NEXT_PUBLIC_*` environment variables, making templates 100% reusable without code changes.
