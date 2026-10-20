# Gadgetverse

A gadget storefront web application built with **React, TypeScript, and Vite**. The interface includes product discovery, filtering, product previews, wishlist-related flows, and account/profile pages.

## Features

- Product search with autocomplete
- Category and price-range filters
- Sorting by price, rating, recency, and review count
- Product details modal and quick view
- Top-deal and new-arrival sections
- Recently viewed products
- Authentication and profile routes
- Wishlist and shared-wishlist routes
- Admin routes for product and banner management
- Responsive navigation, including mobile navigation

## Tech Stack

- React and TypeScript
- Vite
- Tailwind CSS and shadcn/ui
- React Router
- TanStack Query
- Supabase client integration

## Run Locally

### Prerequisites

Install a current Node.js LTS release and npm.

```bash
git clone https://github.com/jagadeesh-ai-dev/gadgetverse-showcase.git
cd gadgetverse-showcase
npm install
npm run dev
```

Use the local URL printed by Vite to open the app.

## Build and Lint

```bash
npm run build
npm run lint
```

## Configuration and Security

The project includes a Supabase client integration. Configure any required project environment variables locally before using backend-dependent features. Never commit API keys, access tokens, or production credentials.

## Project Workspace

The project workspace is available at [Lovable](https://lovable.dev/projects/969bb643-b428-49ae-974f-07ae0336b903).

## Next Improvements

- Add screenshots and a verified public demo URL
- Document the data model and environment setup
- Add tests for product filtering, wishlist flows, and account routes
- Verify authorization for admin routes before production deployment

---

Built by [Jagadeesh](https://github.com/jagadeesh-ai-dev).
