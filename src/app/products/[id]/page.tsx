import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, getRelatedProducts, type Product } from '@/lib/data/products'

interface PageProps {
  params: Promise<{ id: string }>
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function getStockStatus(stock: number): { label: string; className: string } {
  if (stock === 0) return { label: 'Out of Stock', className: 'badge-ink' }
  if (stock <= 5) return { label: `Only ${stock} left`, className: 'badge-gold' }
  if (stock <= 15) return { label: 'Low Stock', className: 'badge-gold' }
  return { label: 'In Stock', className: 'badge-accent' }
}

export async function generateStaticParams() {
  const products = await import('@/lib/data/products').then(m => m.getAllProducts())
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.name} | Atelier Store`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const stockStatus = getStockStatus(product.stock)
  const relatedProducts = getRelatedProducts(product.id, 4)
  const selectedColor = product.colors[0]

  return (
    <main className="min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Breadcrumb */}
      <nav
        className="border-b border-neutral-200 bg-paper"
        aria-label="Breadcrumb"
        style={{ borderColor: 'rgb(217 217 217)' }}
      >
        <div className="container container-wide px-6 py-4">
          <ol className="inline inline-sm items-center" role="list" aria-label="Breadcrumb">
            <li>
              <Link href="/" className="nav-link-subtle text-sm">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>
            <li>
              <Link href="/collections" className="nav-link-subtle text-sm">
                Shop
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>
            <li>
              <Link
                href={`/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="nav-link-subtle text-sm"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>
            <li aria-current="page" className="text-ink text-sm font-medium">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section id="main-content" className="py-12 lg:py-16 bg-paper" aria-labelledby="product-name">
        <div className="container container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Image Gallery - 7 columns */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-5 gap-4 mb-4" role="group" aria-label="Product images">
                {/* Main Image */}
                <div className="col-span-4 row-span-2">
                  <div className="aspect-product relative overflow-hidden bg-neutral-100 rounded-lg">
                    <Image
                      src={selectedColor.images[0]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 60vw, 45vw"
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="col-span-1 flex flex-col gap-4">
                  {selectedColor.images.slice(0, 2).map((image, index) => (
                    <button
                      key={index}
                      className="aspect-square relative overflow-hidden bg-neutral-100 rounded-lg transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional thumbnails row */}
              {selectedColor.images.length > 2 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" role="group" aria-label="Additional product images">
                  {selectedColor.images.slice(2).map((image, index) => (
                    <button
                      key={index + 2}
                      className="flex-shrink-0 w-20 h-20 relative overflow-hidden bg-neutral-100 rounded-lg transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                      aria-label={`View image ${index + 3}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Color Swatches */}
              {product.colors.length > 1 && (
                <div className="mt-8 stack-sm">
                  <p className="overline text-accent-600">Color</p>
                  <div className="inline inline-sm" role="group" aria-label="Color options">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        className="relative w-10 h-10 rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                        style={{
                          backgroundColor: color.hex,
                          borderColor: color.name === selectedColor.name ? 'var(--color-ink)' : 'rgb(217 217 217)',
                        }}
                        aria-label={color.name}
                        aria-pressed={color.name === selectedColor.name}
                      >
                        {color.name === selectedColor.name && (
                          <svg className="absolute inset-0 w-5 h-5 mx-auto my-auto text-paper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info - 5 columns */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 lg:top-32 space-y-6">
                {/* Category & Badge */}
                <div className="inline inline-sm items-center gap-2">
                  <Link
                    href={`/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="caption text-accent-600 hover:text-accent-700 transition-colors"
                  >
                    {product.category}
                  </Link>
                  {product.badge && (
                    <span className="badge badge-filled badge-accent">{product.badge}</span>
                  )}
                </div>

                {/* Product Name */}
                <h1 id="product-name" className="display-sm font-display font-normal tracking-tight text-ink">
                  {product.name}
                </h1>

                {/* Price & Stock */}
                <div className="inline inline-sm items-baseline gap-4">
                  <div className="inline inline-sm items-baseline gap-3">
                    <span className="display-sm font-display font-normal text-ink">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="title-md text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className={`badge badge-outline ${stockStatus.className}`}>
                    {stockStatus.label}
                  </span>
                </div>

                {/* SKU */}
                <p className="caption text-neutral-500">SKU: {product.sku}</p>

                {/* Short Description */}
                <p className="body-md text-neutral-700 border-t border-neutral-200 pt-6" style={{ borderColor: 'rgb(217 217 217)' }}>
                  {product.description}
                </p>

                {/* Size Selection */}
                {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                  <div className="stack-sm border-t border-neutral-200 pt-6" style={{ borderColor: 'rgb(217 217 217)' }}>
                    <p className="overline text-accent-600">Size</p>
                    <div className="inline inline-sm flex-wrap" role="group" aria-label="Size options">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="btn btn-secondary btn-sm min-w-[48px] h-10 transition-all duration-200 hover:border-ink hover:bg-neutral-100 focus-visible:border-ink focus-visible:bg-neutral-100"
                          aria-label={`Select size ${size}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="caption text-neutral-500">
                      <Link href="/size-guide" className="link-underline hover:text-ink">
                        View Size Guide
                      </Link>
                    </p>
                  </div>
                )}

                {/* Add to Cart / Buy */}
                <div className="stack-sm border-t border-neutral-200 pt-6" style={{ borderColor: 'rgb(217 217 217)' }}>
                  <button
                    className="btn btn-primary btn-lg btn-full"
                    disabled={product.stock === 0}
                    aria-disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                  </button>
                  <button className="btn btn-secondary btn-lg btn-full">
                    Buy Now
                  </button>
                </div>

                {/* Services / Trust Signals */}
                <div className="border-t border-neutral-200 pt-6 space-y-3" style={{ borderColor: 'rgb(217 217 217)' }}>
                  <div className="inline inline-sm items-center gap-2 text-sm text-neutral-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span>Free worldwide shipping on orders over $500</span>
                  </div>
                  <div className="inline inline-sm items-center gap-2 text-sm text-neutral-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <line x1="18" y1="5" x2="18" y2="19" />
                    </svg>
                    <span>60-day returns with free pickup</span>
                  </div>
                  <div className="inline inline-sm items-center gap-2 text-sm text-neutral-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                      <line x1="10" y1="4" x2="10" y2="20" />
                    </svg>
                    <span>Secure encrypted checkout</span>
                  </div>
                </div>

                {/* Origin */}
                <p className="caption text-neutral-500 border-t border-neutral-200 pt-6" style={{ borderColor: 'rgb(217 217 217)' }}>
                  {product.origin}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16 lg:mt-24">
            <div className="border-t border-neutral-200" style={{ borderColor: 'rgb(217 217 217)' }} />
            <div className="mt-12 lg:mt-16">
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 lg:mt-32" aria-labelledby="related-heading">
              <div className="border-t border-neutral-200 mb-12 lg:mb-16" style={{ borderColor: 'rgb(217 217 217)' }} />
              <header className="text-center mb-12 lg:mb-16 stagger">
                <p className="overline text-accent-600">You May Also Like</p>
                <h2 id="related-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
                  Complete the Look
                </h2>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <article
                    key={relatedProduct.id}
                    className="card card-interactive group"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="block"
                      aria-label={`${relatedProduct.name} - ${formatPrice(relatedProduct.price)}`}
                    >
                      <div className="card-media aspect-product relative overflow-hidden bg-neutral-100">
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {relatedProduct.badge && (
                          <span className="absolute top-3 left-3 badge badge-filled badge-accent">
                            {relatedProduct.badge}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="btn btn-ghost text-paper border-white/30 hover:bg-white/10 px-6 py-3">
                            Quick View
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="card-body">
                      <p className="caption text-accent-600 mb-1">{relatedProduct.category}</p>
                      <h3 className="headline-sm font-display font-normal truncate-1 mb-2">
                        <Link href={`/products/${relatedProduct.id}`} className="link-underline hover:text-accent-700">
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <div className="inline items-center gap-2">
                        <span className="title-md text-ink">{formatPrice(relatedProduct.price)}</span>
                        {relatedProduct.originalPrice && (
                          <span className="title-md text-neutral-400 line-through">{formatPrice(relatedProduct.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { id: 'description', label: 'Description', content: product.description },
    { id: 'details', label: 'Details', content: product.details.map(d => <li key={d}>{d}</li>) },
    { id: 'features', label: 'Features', content: product.features.map(f => <li key={f}>{f}</li>) },
    { id: 'materials-care', label: 'Materials & Care', content: (
      <div className="stack-lg">
        <div>
          <h4 className="title-sm font-medium mb-2">Materials</h4>
          <p className="body-md text-neutral-700">{product.materials}</p>
        </div>
        <div>
          <h4 className="title-sm font-medium mb-2">Care Instructions</h4>
          <p className="body-md text-neutral-700">{product.care}</p>
        </div>
        <div>
          <h4 className="title-sm font-medium mb-2">Origin</h4>
          <p className="body-md text-neutral-700">{product.origin}</p>
        </div>
      </div>
    )},
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-1 mb-8 border-b border-neutral-200" style={{ borderColor: 'rgb(217 217 217)' }} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === 'description'}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className="btn btn-ghost px-6 py-4 text-sm font-medium transition-all duration-200 hover:bg-neutral-100 border-b-2 border-transparent -mb-px"
            data-tab={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" className="prose prose-neutral max-w-none">
        <p className="body-lg text-neutral-700">{product.description}</p>
      </div>

      {tabs.slice(1).map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden
          className="prose prose-neutral max-w-none"
        >
          <ul className="space-y-3">
            {tab.content}
          </ul>
        </div>
      ))}
    </div>
  )
}