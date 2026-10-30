import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, uniqueIndex, index } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  providerId: text('provider_id').notNull(),
  accountId: text('account_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// ============================================
// PRODUCT TABLES
// ============================================

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'restrict' }).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  sku: text('sku').notNull().unique(),
  description: text('description').notNull(),
  details: jsonb('details').notNull().default('[]'),
  features: jsonb('features').notNull().default('[]'),
  materials: text('materials').notNull(),
  care: text('care').notNull(),
  origin: text('origin').notNull(),
  priceCents: integer('price_cents').notNull(),
  originalPriceCents: integer('original_price_cents'),
  badge: text('badge'),
  stock: integer('stock').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  idxProductsCategoryId: index('idx_products_category_id').on(table.categoryId),
  idxProductsSlug: index('idx_products_slug').on(table.slug),
  idxProductsIsActive: index('idx_products_is_active').on(table.isActive),
  idxProductsBadge: index('idx_products_badge').on(table.badge),
  idxProductsPriceCents: index('idx_products_price_cents').on(table.priceCents),
}))

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  idxProductImagesProductId: index('idx_product_images_product_id').on(table.productId),
}))

export const productColors = pgTable('product_colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  hex: text('hex').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  idxProductColorsProductId: index('idx_product_colors_product_id').on(table.productId),
}))

export const productColorImages = pgTable('product_color_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  colorId: uuid('color_id').references(() => productColors.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const productSizes = pgTable('product_sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  idxProductSizesProductId: index('idx_product_sizes_product_id').on(table.productId),
}))

export const productStock = pgTable('product_stock', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  colorId: uuid('color_id').references(() => productColors.id, { onDelete: 'set null' }),
  sizeId: uuid('size_id').references(() => productSizes.id, { onDelete: 'set null' }),
  quantity: integer('quantity').default(0).notNull(),
  reserved: integer('reserved').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  idxProductStockVariant: uniqueIndex('idx_product_stock_variant').on(table.productId, table.colorId, table.sizeId),
  idxProductStockProductId: index('idx_product_stock_product_id').on(table.productId),
}))