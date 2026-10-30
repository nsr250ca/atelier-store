# Plan: Replace Hardcoded Product Data with PostgreSQL + Drizzle ORM

## Context

The Atelier Store currently uses **hardcoded product data** in `src/lib/data/products.ts` (10 products with rich metadata). The database layer (Drizzle + Neon PostgreSQL) exists but only contains **auth tables** (users, sessions, accounts, verifications). No product, category, or inventory tables exist yet.

This plan replaces the static TypeScript product data with a proper PostgreSQL schema while maintaining the existing storefront functionality.

---

## Database Schema Design

### Tables

#### 1. `categories` — Product categories (normalized)
```sql
id          UUID (PK, defaultRandom)
name        VARCHAR(100) NOT NULL UNIQUE        -- "Outerwear", "Tops", "Bottoms", etc.
slug        VARCHAR(120) NOT NULL UNIQUE        -- "outerwear", "tops", "bottoms"
description TEXT
image_url   VARCHAR(500)                        -- Optional category hero image
sort_order  INTEGER DEFAULT 0                   -- Display order in navigation
created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 2. `products` — Core product data
```sql
id              UUID (PK, defaultRandom)
category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT
name            VARCHAR(200) NOT NULL
slug            VARCHAR(220) NOT NULL UNIQUE     -- URL-friendly: "double-faced-cashmere-coat"
sku             VARCHAR(50) NOT NULL UNIQUE      -- "ATL-CC-001"
description     TEXT NOT NULL
details         JSONB NOT NULL DEFAULT '[]'      -- Array of strings: ["Detail 1", "Detail 2"]
features        JSONB NOT NULL DEFAULT '[]'      -- Array of strings
materials       TEXT NOT NULL
care            TEXT NOT NULL
origin          TEXT NOT NULL
price_cents     INTEGER NOT NULL                 -- Stored in cents (185000 = $1,850.00)
original_price_cents INTEGER                     -- Optional sale price in cents
badge           VARCHAR(30)                      -- "New", "Bestseller", or NULL
stock           INTEGER NOT NULL DEFAULT 0       -- Total available quantity
is_active       BOOLEAN NOT NULL DEFAULT TRUE    -- Soft delete / visibility toggle
created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 3. `product_images` — Product gallery images
```sql
id          UUID (PK, defaultRandom)
product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE
url         VARCHAR(500) NOT NULL
alt_text    VARCHAR(200)
sort_order  INTEGER DEFAULT 0
is_primary  BOOLEAN NOT NULL DEFAULT FALSE
created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 4. `product_colors` — Color variants per product
```sql
id          UUID (PK, defaultRandom)
product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE
name        VARCHAR(50) NOT NULL                -- "Camel", "Charcoal"
hex         VARCHAR(7) NOT NULL                 -- "#C19A6B"
sort_order  INTEGER DEFAULT 0
created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 5. `product_color_images` — Images per color variant
```sql
id           UUID (PK, defaultRandom)
color_id     UUID NOT NULL REFERENCES product_colors(id) ON DELETE CASCADE
url          VARCHAR(500) NOT NULL
alt_text     VARCHAR(200)
sort_order   INTEGER DEFAULT 0
is_primary   BOOLEAN NOT NULL DEFAULT FALSE
created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 6. `product_sizes` — Size variants per product
```sql
id           UUID (PK, defaultRandom)
product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE
name         VARCHAR(20) NOT NULL                -- "XS", "S", "M", "L", "XL", "28", "One Size"
sort_order   INTEGER DEFAULT 0
is_default   BOOLEAN NOT NULL DEFAULT FALSE
created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

#### 7. `product_stock` — Per-variant inventory (simplified for v1)
```sql
id            UUID (PK, defaultRandom)
product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE
color_id      UUID REFERENCES product_colors(id) ON DELETE SET NULL  -- NULL = all colors
size_id       UUID REFERENCES product_sizes(id) ON DELETE SET NULL    -- NULL = all sizes
quantity      INTEGER NOT NULL DEFAULT 0
reserved      INTEGER NOT NULL DEFAULT 0        -- For future cart reservation
created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()

UNIQUE(product_id, color_id, size_id)            -- One row per variant combination
```

### Relationships

```
categories (1) ──────< (N) products
products (1) ──────< (N) product_images
products (1) ──────< (N) product_colors
product_colors (1) ──< (N) product_color_images
products (1) ──────< (N) product_sizes
products (1) ──────< (N) product_stock
  └── product_stock.color_id ────> product_colors
  └── product_stock.size_id ────> product_sizes
```

### Indexes

```sql
-- Products
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_badge ON products(badge);
CREATE INDEX idx_products_price_cents ON products(price_cents);

-- Product images
CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Product colors
CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);

-- Product sizes
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);

-- Stock
CREATE INDEX idx_product_stock_product_id ON product_stock(product_id);
CREATE INDEX idx_product_stock_variant ON product_stock(product_id, color_id, size_id);
```

---

## Files to Modify

### 1. Database Schema (`src/lib/db/schema.ts`)
**Add 7 new tables** (categories, products, product_images, product_colors, product_color_images, product_sizes, product_stock) to the existing schema file alongside auth tables.

### 2. Drizzle Config (`drizzle.config.ts`)
**No changes needed** — already points to `./src/lib/db/schema.ts` and outputs to `./drizzle`.

### 3. Database Connection (`src/lib/db/index.ts`)
**No changes needed** — already exports `db` instance.

### 4. Data Access Layer (NEW: `src/lib/db/queries/products.ts`)
**Create new file** with type-safe query functions:
- `getAllProducts()` → Product with relations
- `getProductById(id)` → Full product with images, colors, sizes, stock
- `getProductBySlug(slug)` → Same as above
- `getProductsByCategory(categorySlug)` → Paginated list
- `getRelatedProducts(productId, limit)` → Same category, exclude self
- `getCategories()` → All categories with product counts
- `getCategoryBySlug(slug)` → Category with products
- `searchProducts(query)` → Basic text search on name/description
- `decrementStock(productId, colorId?, sizeId?, quantity)` — For future cart integration

### 5. Type Definitions (NEW: `src/lib/db/types/products.ts`)
**Create new file** with inferred Drizzle types:
- `Product` — Select from products table
- `ProductWithRelations` — Product + categories + images + colors + colorImages + sizes + stock
- `Category` — Select from categories table
- `CategoryWithProducts` — Category + products array

### 6. Product Detail Page (`src/app/products/[id]/page.tsx`)
**Update to use database queries:**
- Replace `getProductById(id)` import with database query
- Keep `generateStaticParams()` but fetch from database at build time
- Update metadata generation to use database data
- Stock status logic remains the same (uses `stock` field)

### 7. Home Page (`src/app/page.tsx`)
**Replace hardcoded product data with database queries:**
- Import `getProductsByCategory` or `getAllProducts` from new queries
- Remove inline duplicate product data
- Fetch "New Arrivals" (by badge or date) and "Bestsellers" (by badge) from DB

### 8. Header Navigation (`src/components/Header.tsx`)
**Update collection links to use category slugs:**
- Dynamic category routes: `/collections/[slug]`
- Will need collection page implementation (future, not in v1)

### 9. Seed Script (NEW: `scripts/seed-products.ts`)
**Create script to populate database** with current 10 products from `src/lib/data/products.ts`:
- Insert categories first
- Insert products with all relations (images, colors, color images, sizes, stock)
- Run via `npm run db:seed` (add to package.json)

### 10. Package.json
**Add seed script:**
```json
"db:seed": "tsx scripts/seed-products.ts"
```

---

## Migration Approach

### Step 1: Generate Migration
```bash
npm run db:generate
```
Creates `drizzle/0001_add_product_tables.sql` (or similar timestamped file).

### Step 2: Review Migration SQL
Verify the generated SQL matches the schema design above.

### Step 3: Push to Database
```bash
npm run db:push
```
Applies schema to Neon PostgreSQL.

### Step 4: Seed Initial Data
```bash
npm run db:seed
```
Populates categories and 10 products with all variant data.

### Step 5: Verify with Drizzle Studio
```bash
npm run db:studio
```
Confirm data integrity and relationships.

---

## How Storefront Uses the Database

### Build Time (Static Generation)
- `generateStaticParams()` in `products/[id]/page.tsx` calls `getAllProducts()` at build time
- Pre-renders all product pages as static HTML
- Fast initial load, SEO-friendly

### Runtime (Server Components)
- All product pages are **Server Components** (default in Next.js App Router)
- Database queries execute on the server during request/response
- No client-side data fetching for initial render
- Types flow from Drizzle schema → TypeScript → React components

### Data Flow
```
Database (PostgreSQL)
    ↓ Drizzle ORM (type-safe)
src/lib/db/queries/products.ts
    ↓ TypeScript types
Server Components (pages)
    ↓ Props
Client Components (interactive UI: color/size selection, add to bag)
```

### Backward Compatibility
- Existing `Product` interface in `src/lib/data/products.ts` **kept temporarily** for reference
- New `ProductWithRelations` type from Drizzle matches all required fields
- Components updated one at a time; no breaking changes to UI

---

## Verification Plan

### 1. Database Schema Verification
- [ ] Run `npm run db:generate` — migration file created
- [ ] Review migration SQL — tables, columns, indexes, FKs correct
- [ ] Run `npm run db:push` — no errors
- [ ] Run `npm run db:studio` — tables visible, relationships work

### 2. Seed Data Verification
- [ ] Run `npm run db:seed` — 7 categories, 10 products inserted
- [ ] Verify each product has: images (3+), colors (3-6), color images, sizes, stock
- [ ] Verify categories match product categories (Outerwear, Tops, Bottoms, Bags, Shoes, Accessories, Knitwear)

### 3. Home Page Verification
- [ ] `npm run dev` — server starts
- [ ] Visit `http://localhost:3000` — New Arrivals (6) and Bestsellers (4) load from DB
- [ ] Product cards display: image, name, price, badge, category, link works

### 4. Product Detail Page Verification
- [ ] Visit `http://localhost:3000/products/cashmere-coat` — loads from DB
- [ ] All tabs work: Description, Details, Features, Materials & Care
- [ ] Image gallery: main image, thumbnails, color swatches
- [ ] Stock badge shows correct status (In Stock / Low Stock / Only X left / Out of Stock)
- [ ] Size buttons render correctly
- [ ] Related products (same category, max 4) display
- [ ] SEO metadata: title, description, OG tags populated from DB

### 5. Type Safety Verification
- [ ] `npm run build` — no TypeScript errors
- [ ] `npm run lint` — no ESLint errors
- [ ] Hover types in IDE show correct inferred types from Drizzle

### 6. Performance Check
- [ ] Home page: single query for products (or two: new + bestseller)
- [ ] Product detail: single query with joins for all relations
- [ ] No N+1 query issues

---

## Future Enhancements (Not in v1)

| Feature | Table Changes |
|---------|---------------|
| Product variants (SKU per color+size) | Extend `product_stock` with `sku` field |
| Inventory reservations | Add `reserved` column usage + transactions |
| Multi-warehouse stock | Add `warehouse_id` to `product_stock` |
| Product reviews | New `reviews` table |
| Wishlists | New `wishlists`, `wishlist_items` tables |
| Collections/Categories page | New `/collections/[slug]` route with filtering |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Migration fails on existing DB | Test on fresh Neon branch first; use `db:push` for dev |
| Type mismatches between old/new | Keep old types during transition; gradual migration |
| Build-time query failures | Wrap `generateStaticParams` in try/catch; fallback to empty array |
| Seed script idempotency | Use `ON CONFLICT DO NOTHING` or check existence before insert |
| Performance regression | Add indexes; monitor query plans in Neon console |

---

## Summary

This plan adds **7 new tables** to the existing Drizzle schema, creates a **type-safe query layer**, **seeds the database** with current product data, and **updates two pages** (home + product detail) to fetch from PostgreSQL instead of static TypeScript files. The approach maintains static generation for performance, preserves all existing UI functionality, and establishes a foundation for future e-commerce features.