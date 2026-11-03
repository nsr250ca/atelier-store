# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atelier Store - A Next.js 14 eCommerce starter with TypeScript, Tailwind CSS, Better Auth, Drizzle ORM, and PostgreSQL (Neon).

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run start        # Run production server

# Database (Drizzle)
npm run db:generate  # Generate migration files
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio UI

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom primary color palette
- **Auth**: Better Auth (email/password + OAuth ready)
- **Database**: PostgreSQL via Neon serverless (`@neondatabase/serverless`)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations

### Key Files

| Path | Purpose |
|------|---------|
| `src/lib/db/index.ts` | Drizzle database connection (Neon HTTP driver) |
| `src/lib/db/schema.ts` | Auth + product tables (users, sessions, accounts, verifications, categories, products, product_images, product_colors, product_color_images, product_sizes, product_stock) |
| `src/lib/db/queries/products.ts` | Type-safe product query functions (getAllProducts, getProductById, getNewArrivals, getBestsellers, etc.) |
| `src/lib/db/types/products.ts` | Drizzle-inferred types + storefront UI types (StorefrontProduct, StockStatusInfo) |
| `src/lib/auth.ts` | Better Auth config with Drizzle adapter |
| `src/middleware.ts` | Auth middleware - attaches session to request headers |
| `src/app/layout.tsx` | Root layout with metadata |
| `src/app/page.tsx` | Home page - fetches new arrivals & bestsellers from DB |
| `src/app/products/[id]/page.tsx` | Product detail page - fetches from DB with static generation |
| `scripts/seed-products.ts` | Database seed script for 10 products + categories |
| `drizzle.config.ts` | Drizzle Kit config (schema location, output, dialect) |

### Auth Flow
- Better Auth handles all auth routes at `/api/auth/*`
- Middleware (`src/middleware.ts`) reads session and adds user info to request headers (`x-user-id`, `x-user-email`)
- Social providers (Google, GitHub) are commented out in `src/lib/auth.ts` - uncomment and add env vars to enable

### Database Schema
**Auth tables** (existing):
- `users` - core user data
- `sessions` - session tokens with expiry
- `accounts` - OAuth account linking
- `verifications` - email verification tokens

**Product tables** (added):
- `categories` - product categories (name, slug, description, sort_order)
- `products` - core product data (name, slug, sku, description, details, features, materials, care, origin, price_cents, original_price_cents, badge, stock, is_active, category_id FK)
- `product_images` - product gallery images (product_id FK, url, alt_text, sort_order, is_primary)
- `product_colors` - color variants per product (product_id FK, name, hex, sort_order)
- `product_color_images` - images per color variant (color_id FK, url, alt_text, sort_order, is_primary)
- `product_sizes` - size variants per product (product_id FK, name, sort_order, is_default)
- `product_stock` - per-variant inventory (product_id FK, color_id FK, size_id FK, quantity, reserved, unique constraint on product_id+color_id+size_id)

### Database Conventions
- **Primary keys**: UUID with `defaultRandom()`
- **Timestamps**: `timestamp('created_at', { withTimezone: true }).defaultNow().notNull()` and `updated_at` same
- **Prices**: Stored in **cents** as integers (e.g., 185000 = $1,850.00)
- **JSONB arrays**: `details`, `features` default to `'[]'` for JSON arrays of strings
- **Foreign keys**: Explicit `references()` with `onDelete: 'cascade'` for dependent data, `onDelete: 'restrict'` for categories, `onDelete: 'set null'` for optional variant refs
- **Indexes**: Named `idx_{table}_{column}` for single columns, `idx_{table}_{col1}_{col2}` for composite
- **Unique constraints**: Named `idx_{table}_variant` for composite unique keys
- **Drizzle query API**: Schema passed to `drizzle(sql, { schema })` for type-safe relations
- **Relation naming**: Use `stockItems` for stock relation to avoid conflict with `stock` column on products
- **Seed script**: `npm run db:seed` runs `scripts/seed-products.ts` with idempotent upserts
- **Product lookup**: Use `getProductById(id)` (UUID) for product detail pages — the route parameter `[id]` maps to the database `id` column (UUID), not the `slug` column
- **Static generation**: `generateStaticParams()` returns `{ id: product.id }` using UUIDs for static path generation
- **Data source**: All product data comes from Neon PostgreSQL via Drizzle ORM — the local `src/lib/data/products.ts` file exists but is **not used** (legacy/starter data)

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET` - 32+ char secret for session signing
- `BETTER_AUTH_URL` - Base URL (http://localhost:3000 for dev)
- OAuth credentials (optional)

### Path Aliases
`@/*` maps to `src/*` (configured in `tsconfig.json`)

## Development Notes

- This is a **starter scaffold only** - no ecommerce features, UI components, payments, or deployment config
- Run `npm run db:generate` then `npm run db:push` after configuring DATABASE_URL
- Build output goes to `.next/` (gitignored)
- Drizzle migrations output to `drizzle/` (gitignored)