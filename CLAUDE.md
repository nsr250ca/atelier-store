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
| `src/lib/db/schema.ts` | Auth tables: users, sessions, accounts, verifications |
| `src/lib/auth.ts` | Better Auth config with Drizzle adapter |
| `src/middleware.ts` | Auth middleware - attaches session to request headers |
| `src/app/layout.tsx` | Root layout with metadata |
| `src/app/page.tsx` | Home page with sign in/up links |
| `drizzle.config.ts` | Drizzle Kit config (schema location, output, dialect) |

### Auth Flow
- Better Auth handles all auth routes at `/api/auth/*`
- Middleware (`src/middleware.ts`) reads session and adds user info to request headers (`x-user-id`, `x-user-email`)
- Social providers (Google, GitHub) are commented out in `src/lib/auth.ts` - uncomment and add env vars to enable

### Database Schema
Minimal auth-only schema in `src/lib/db/schema.ts`:
- `users` - core user data
- `sessions` - session tokens with expiry
- `accounts` - OAuth account linking
- `verifications` - email verification tokens

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