import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoriesWithCoverImages } from '@/lib/db/queries/products'
import type { CategoryWithCoverImage } from '@/lib/db/types/products'

export const metadata: Metadata = {
  title: 'Collections | Atelier Store',
  description: 'Explore our curated collections of luxury essentials. From women\'s apparel to leather goods, footwear, and home living.',
  openGraph: {
    title: 'Collections | Atelier Store',
    description: 'Explore our curated collections of luxury essentials.',
    type: 'website',
  },
}

interface CollectionCardProps {
  category: CategoryWithCoverImage
}

function CollectionCard({ category }: CollectionCardProps) {
  const imageUrl = category.coverImage
  const imageAlt = imageUrl ? `${category.name} collection` : 'Collection'

  return (
    <article className="group relative overflow-hidden">
      <Link
        href={`/collections/${category.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 rounded-lg overflow-hidden"
        aria-label={`Shop ${category.name} — ${category.productCount} products`}
      >
        <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23f5f5f5' width='400' height='500'/%3E%3C/svg%3E"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 17" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-paper stagger">
          <p className="overline text-gold-400 mb-2">{category.productCount} products</p>
          <h3 className="display-sm lg:display-md font-display font-normal tracking-tight">
            {category.name}
          </h3>
          {category.description && (
            <p className="body-sm text-neutral-300 mt-2 line-clamp-2 max-w-xs">{category.description}</p>
          )}
          <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-1 group-hover:translate-y-0">
            Explore Collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}

export default async function CollectionsPage() {
  const categories = await getCategoriesWithCoverImages()

  return (
    <main id="main-content" className="min-h-screen bg-paper">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Page Header */}
      <header className="py-16 lg:py-24 bg-cream">
        <div className="container container-prose px-6 text-center stagger">
          <p className="overline text-accent-600">Our Collections</p>
          <h1 className="display-lg lg:display-xl font-display font-normal tracking-tight mt-4">
            Curated Essentials
          </h1>
          <p className="body-lg text-neutral-600 mt-6 max-w-2xl mx-auto">
            Discover thoughtfully crafted pieces across our signature categories.
            Each collection represents our commitment to quality, timeless design, and responsible sourcing.
          </p>
        </div>
      </header>

      {/* Collections Grid */}
      <section className="py-16 lg:py-24" aria-labelledby="collections-heading">
        <div className="container container-wide px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Product collections">
            {categories.map((category, index) => (
              <div key={category.id} role="listitem" style={{ animationDelay: `${index * 100}ms` }}>
                <CollectionCard category={category} />
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-16 lg:py-24">
              <p className="body-lg text-neutral-600">No collections available yet.</p>
              <p className="body-sm text-neutral-500 mt-2">Check back soon for new additions.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 lg:py-24 bg-cream" aria-labelledby="featured-heading">
        <div className="container container-wide px-6">
          <header className="text-center mb-16 stagger">
            <p className="overline text-accent-600">Shop by Category</p>
            <h2 id="featured-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
              Browse All Categories
            </h2>
          </header>

          <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto" aria-label="Quick category links">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="btn btn-outline btn-lg justify-center gap-2 py-6 lg:py-8 text-left hover:bg-ink hover:text-paper transition-colors duration-300"
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-neutral-500 text-sm font-normal">({category.productCount})</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section
        className="py-20 lg:py-32 bg-neutral-950 text-paper relative overflow-hidden"
        aria-labelledby="newsletter-heading"
      >
        <div className="absolute inset-0 bg-gradient-accent opacity-5" aria-hidden="true" />
        <div className="container container-prose px-6 text-center relative z-10 stagger">
          <p className="overline text-gold-400">Stay Connected</p>
          <h2 id="newsletter-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
            The Atelier Edit
          </h2>
          <p className="body-lg text-neutral-400 mt-4 max-w-xl mx-auto">
            Weekly curation of new arrivals, artisan stories, and exclusive access.
            No spam, just craftsmanship.
          </p>

          <form className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3" action="/api/newsletter" method="POST">
            <label htmlFor="email" className="visually-hidden">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border-white/10 text-paper placeholder:text-neutral-500 focus:border-gold-400 focus:ring-gold-400/40 px-5 py-4"
              required
              autoComplete="email"
            />
            <button type="submit" className="btn btn-accent btn-lg whitespace-nowrap">
              Subscribe
            </button>
          </form>

          <p className="caption text-neutral-500 mt-4">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="link-underline hover:text-gold-400">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms" className="link-underline hover:text-gold-400">Terms of Service</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300 py-16 lg:py-24" role="contentinfo">
        <div className="container container-wide px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="block" aria-label="Atelier Store Home">
                <p className="display-sm font-display font-normal tracking-tight text-paper">
                  Atelier Store
                </p>
              </Link>
              <p className="body-sm text-neutral-500 mt-4 max-w-xs">
                Curated luxury essentials for the modern wardrobe.
              </p>
            </div>

            <nav aria-label="Shop">
              <h4 className="title-sm text-paper uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><Link href="/collections/womens" className="nav-link-subtle">Women's Collection</Link></li>
                <li><Link href="/collections/leather" className="nav-link-subtle">Leather Goods</Link></li>
                <li><Link href="/collections/shoes" className="nav-link-subtle">Footwear</Link></li>
                <li><Link href="/collections/home" className="nav-link-subtle">Home & Living</Link></li>
                <li><Link href="/collections/new-arrivals" className="nav-link-subtle">New Arrivals</Link></li>
              </ul>
            </nav>

            <nav aria-label="Support">
              <h4 className="title-sm text-paper uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-3">
                <li><Link href="/support" className="nav-link-subtle">Customer Care</Link></li>
                <li><Link href="/shipping-returns" className="nav-link-subtle">Shipping & Returns</Link></li>
                <li><Link href="/size-guide" className="nav-link-subtle">Size Guide</Link></li>
                <li><Link href="/contact" className="nav-link-subtle">Contact Us</Link></li>
                <li><Link href="/faq" className="nav-link-subtle">FAQ</Link></li>
              </ul>
            </nav>

            <nav aria-label="Company">
              <h4 className="title-sm text-paper uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="nav-link-subtle">Our Story</Link></li>
                <li><Link href="/sustainability" className="nav-link-subtle">Sustainability</Link></li>
                <li><Link href="/careers" className="nav-link-subtle">Careers</Link></li>
                <li><Link href="/press" className="nav-link-subtle">Press</Link></li>
                <li><Link href="/wholesale" className="nav-link-subtle">Wholesale</Link></li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="body-sm text-neutral-500">
              © {new Date().getFullYear()} Atelier Store. All rights reserved.
            </p>

            <div className="inline-flex items-center gap-6" role="list" aria-label="Social links">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-paper transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-paper transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </Link>
              <Link href="mailto:hello@atelierstore.com" className="text-neutral-500 hover:text-paper transition-colors" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </Link>
            </div>

            <div className="inline-flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/privacy" className="hover:text-paper transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-paper transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-paper transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}