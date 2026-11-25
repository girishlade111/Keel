# Keel Configuration Guide

## Environment Variables (`.env`)

Copy `.env.example` to `.env` to configure runtime endpoints:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_SITE_URL` | Canonical site base URL | `http://localhost:5173` |
| `VITE_CONTACT_ENDPOINT` | Optional POST endpoint for contact form submissions | Empty (local demo validation adapter) |
| `VITE_NEWSLETTER_ENDPOINT` | Optional POST endpoint for footer newsletter subscriptions | Empty (local demo validation adapter) |
| `VITE_DEMO_MODE` | Enables clear demonstration disclosures on forms | `true` |

## Centralized Identity & Content

- `src/data/siteConfig.ts`: Brand name, logos, email, phone, office address, working hours, navigation links, All Pages dropdown items, social URLs, and CTA targets.
- `src/data/pricing.ts`: Monthly/yearly plan pricing, savings labels, card artwork, and comparison table rows.
- `src/data/articles.ts`: Featured post + 12 categorized articles with authors, avatars, covers, and body sections.
- `src/data/integrations.ts`: 9 financial partner integration cards and detail content.
- `src/data/team.ts`: 7 team members, 3 customer testimonials, and 2 partner logo rows.
- `src/data/faqs.ts`: 6 shared FAQ items.
