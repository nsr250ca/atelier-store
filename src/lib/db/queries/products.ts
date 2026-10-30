import { db } from '../index'
import {
  categories,
  products,
  productImages,
  productColors,
  productColorImages,
  productSizes,
  productStock,
} from '../schema'
import { eq, and, desc, asc, ilike, or, sql } from 'drizzle-orm'

// ============================================
// TYPE DEFINITIONS
// ============================================

export type Category = typeof categories.$inferSelect

export type Product = typeof products.$inferSelect

export type ProductImage = typeof productImages.$inferSelect

export type ProductColor = typeof productColors.$inferSelect

export type ProductColorImage = typeof productColorImages.$inferSelect

export type ProductSize = typeof productSizes.$inferSelect

export type ProductStock = typeof productStock.$inferSelect

// Extended types with relations
// Note: We don't extend Product because the 'stock' relation conflicts with the 'stock' column
export interface ProductWithRelations {
  // Base product fields (from products.$inferSelect)
  id: string
  categoryId: string
  name: string
  slug: string
  sku: string
  description: string
  details: unknown
  features: unknown
  materials: string
  care: string
  origin: string
  priceCents: number
  originalPriceCents: number | null
  badge: string | null
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date

  // Relations
  category: Category
  images: ProductImage[]
  colors: (ProductColor & { images: ProductColorImage[] })[]
  sizes: ProductSize[]
  stockItems: ProductStock[]
}

export interface CategoryWithProducts extends Category {
  products: Product[]
}

export interface CategoryWithProductCount extends Category {
  productCount: number
}

// ============================================
// QUERY FUNCTIONS
// ============================================

/**
 * Get all active products with full relations
 * Used for build-time static generation
 */
export async function getAllProducts(): Promise<ProductWithRelations[]> {
  const allProducts = await db.query.products.findMany({
    where: eq(products.isActive, true),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
  })

  // Map stock relation to stockItems for type compatibility
  return allProducts.map((p) => ({
    ...p,
    stockItems: p.stock,
  })) as ProductWithRelations[]
}

/**
 * Get a single product by ID with full relations
 */
export async function getProductById(id: string): Promise<ProductWithRelations | undefined> {
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, id), eq(products.isActive, true)),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
  })

  return product ? { ...product, stockItems: product.stock } : undefined
}

/**
 * Get a single product by slug with full relations
 */
export async function getProductBySlug(slug: string): Promise<ProductWithRelations | undefined> {
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
  })

  return product ? { ...product, stockItems: product.stock } : undefined
}

/**
 * Get products by category slug with pagination
 */
export async function getProductsByCategory(
  categorySlug: string,
  options: { limit?: number; offset?: number } = {}
): Promise<ProductWithRelations[]> {
  const { limit = 20, offset = 0 } = options

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  })

  if (!category) return []

  const categoryProducts = await db.query.products.findMany({
    where: and(eq(products.categoryId, category.id), eq(products.isActive, true)),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
    limit,
    offset,
  })

  return categoryProducts.map((p) => ({ ...p, stockItems: p.stock })) as ProductWithRelations[]
}

/**
 * Get related products from the same category (excluding current product)
 */
export async function getRelatedProducts(
  productId: string,
  limit = 4
): Promise<ProductWithRelations[]> {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: { categoryId: true },
  })

  if (!product) return []

  const relatedProducts = await db.query.products.findMany({
    where: and(
      eq(products.categoryId, product.categoryId),
      eq(products.isActive, true)
    ),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
    limit: limit + 1, // Fetch one extra to exclude current
  })

  // Filter out the current product
  return relatedProducts
    .filter((p) => p.id !== productId)
    .slice(0, limit)
    .map((p) => ({ ...p, stockItems: p.stock })) as ProductWithRelations[]
}

/**
 * Get all categories with product counts
 */
export async function getCategories(): Promise<CategoryWithProductCount[]> {
  const allCategories = await db.query.categories.findMany({
    orderBy: asc(categories.sortOrder),
  })

  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    allCategories.map(async (category) => {
      const count = await db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(and(eq(products.categoryId, category.id), eq(products.isActive, true)))

      return {
        ...category,
        productCount: count[0]?.count ?? 0,
      }
    })
  )

  return categoriesWithCounts
}

/**
 * Get a single category by slug with its products
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryWithProducts | undefined> {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
    with: {
      products: {
        where: eq(products.isActive, true),
        orderBy: desc(products.createdAt),
      },
    },
  })

  return category as CategoryWithProducts | undefined
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<ProductWithRelations[]> {
  const searchTerm = `%${query}%`

  const results = await db.query.products.findMany({
    where: and(
      eq(products.isActive, true),
      or(
        ilike(products.name, searchTerm),
        ilike(products.description, searchTerm)
      )
    ),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
    limit: 20,
  })

  return results.map((p) => ({ ...p, stockItems: p.stock })) as ProductWithRelations[]
}

/**
 * Get new arrivals (products with "New" badge, ordered by creation date)
 */
export async function getNewArrivals(limit = 6): Promise<ProductWithRelations[]> {
  const newProducts = await db.query.products.findMany({
    where: and(eq(products.badge, 'New'), eq(products.isActive, true)),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
    limit,
  })

  return newProducts.map((p) => ({ ...p, stockItems: p.stock })) as ProductWithRelations[]
}

/**
 * Get bestsellers (products with "Bestseller" badge)
 */
export async function getBestsellers(limit = 4): Promise<ProductWithRelations[]> {
  const bestsellers = await db.query.products.findMany({
    where: and(eq(products.badge, 'Bestseller'), eq(products.isActive, true)),
    with: {
      category: true,
      images: {
        orderBy: asc(productImages.sortOrder),
      },
      colors: {
        orderBy: asc(productColors.sortOrder),
        with: {
          images: {
            orderBy: asc(productColorImages.sortOrder),
          },
        },
      },
      sizes: {
        orderBy: asc(productSizes.sortOrder),
      },
      stock: true,
    },
    orderBy: desc(products.createdAt),
    limit,
  })

  return bestsellers.map((p) => ({ ...p, stockItems: p.stock })) as ProductWithRelations[]
}

/**
 * Get available stock for a product variant
 * If colorId and sizeId are provided, returns specific variant stock
 * If only productId, returns total stock across all variants
 */
export async function getAvailableStock(
  productId: string,
  colorId?: string,
  sizeId?: string
): Promise<number> {
  const stockRecords = await db.query.productStock.findMany({
    where: and(
      eq(productStock.productId, productId),
      colorId ? eq(productStock.colorId, colorId) : undefined,
      sizeId ? eq(productStock.sizeId, sizeId) : undefined
    ),
  })

  return stockRecords.reduce((sum, record) => sum + record.quantity - record.reserved, 0)
}

/**
 * Decrement stock for a product variant (for future cart/checkout integration)
 * Uses a transaction to ensure atomicity
 */
export async function decrementStock(
  productId: string,
  quantity: number,
  colorId?: string,
  sizeId?: string
): Promise<boolean> {
  try {
    await db.transaction(async (tx) => {
      const stockRecords = await tx.query.productStock.findMany({
        where: and(
          eq(productStock.productId, productId),
          colorId ? eq(productStock.colorId, colorId) : undefined,
          sizeId ? eq(productStock.sizeId, sizeId) : undefined
        ),
      })

      for (const record of stockRecords) {
        const available = record.quantity - record.reserved
        if (available < quantity) {
          throw new Error('Insufficient stock')
        }

        await tx
          .update(productStock)
          .set({
            reserved: record.reserved + quantity,
            updatedAt: new Date(),
          })
          .where(eq(productStock.id, record.id))
      }

      // Also update the product's total stock field
      await tx
        .update(products)
        .set({
          stock: sql`${products.stock} - ${quantity}`,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productId))
    })

    return true
  } catch (error) {
    console.error('Failed to decrement stock:', error)
    return false
  }
}