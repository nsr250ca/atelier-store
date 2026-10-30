import type {
  Category,
  Product,
  ProductImage,
  ProductColor,
  ProductColorImage,
  ProductSize,
  ProductStock,
  ProductWithRelations,
  CategoryWithProducts,
  CategoryWithProductCount,
} from '../queries/products'

// Re-export query types for convenience
export type {
  Category,
  Product,
  ProductImage,
  ProductColor,
  ProductColorImage,
  ProductSize,
  ProductStock,
  ProductWithRelations,
  CategoryWithProducts,
  CategoryWithProductCount,
}

// ============================================
// UI-SPECIFIC TYPES
// These match the existing storefront component expectations
// ============================================

/**
 * Product type used by the storefront UI components
 * Maps from database schema to the format expected by existing components
 */
export interface StorefrontProduct {
  id: string
  name: string
  price: number // in dollars (converted from cents)
  originalPrice?: number // in dollars
  images: string[] // Primary product images (from productImages or first color)
  category: string
  badge: string | null
  description: string
  details: string[]
  features: string[]
  materials: string
  care: string
  origin: string
  stock: number
  sku: string
  colors: StorefrontColor[]
  sizes: string[]
}

/**
 * Color variant for storefront display
 */
export interface StorefrontColor {
  name: string
  hex: string
  images: string[]
}

/**
 * Stock status for display badges
 */
export type StockStatus = 'out-of-stock' | 'low-stock' | 'limited' | 'in-stock'

export interface StockStatusInfo {
  status: StockStatus
  label: string
  variant: 'ink' | 'gold' | 'accent'
}

/**
 * Convert database product to storefront product format
 */
export function toStorefrontProduct(product: ProductWithRelations): StorefrontProduct {
  // Get primary images - prefer product images, fallback to first color images
  const primaryImages = product.images.length > 0
    ? product.images.map((img) => img.url)
    : product.colors[0]?.images.map((img) => img.url) ?? []

  // Build colors with their images
  const colors: StorefrontColor[] = product.colors.map((color) => ({
    name: color.name,
    hex: color.hex,
    images: color.images.length > 0
      ? color.images.map((img) => img.url)
      : primaryImages,
  }))

  // Get size names
  const sizes = product.sizes.map((size) => size.name)

  return {
    id: product.id,
    name: product.name,
    price: product.priceCents / 100,
    originalPrice: product.originalPriceCents ? product.originalPriceCents / 100 : undefined,
    images: primaryImages,
    category: product.category.name,
    badge: product.badge ?? null,
    description: product.description,
    details: product.details as string[],
    features: product.features as string[],
    materials: product.materials,
    care: product.care,
    origin: product.origin,
    stock: product.stock,
    sku: product.sku,
    colors,
    sizes,
  }
}

/**
 * Get stock status for display badge
 */
export function getStockStatus(stock: number): StockStatusInfo {
  if (stock <= 0) {
    return { status: 'out-of-stock', label: 'Out of Stock', variant: 'ink' }
  }
  if (stock <= 5) {
    return { status: 'limited', label: `Only ${stock} left`, variant: 'gold' }
  }
  if (stock <= 15) {
    return { status: 'low-stock', label: 'Low Stock', variant: 'gold' }
  }
  return { status: 'in-stock', label: 'In Stock', variant: 'accent' }
}

/**
 * Category for navigation/header
 */
export interface NavCategory {
  name: string
  slug: string
  productCount: number
}