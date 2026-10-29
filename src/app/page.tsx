import Image from 'next/image'
import Link from 'next/link'

// Sample collection data with Unsplash images
const collections = [
  {
    id: 'womens-collection',
    name: "Women's Collection",
    category: 'Ready to Wear',
    description: 'Timeless silhouettes crafted from the finest natural fibers.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1500&fit=crop',
    itemCount: 124,
    href: '/collections/womens',
  },
  {
    id: 'leather-goods',
    name: 'Leather Goods',
    category: 'Accessories',
    description: 'Handcrafted in Italy using vegetable-tanned leathers.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=1500&fit=crop',
    itemCount: 68,
    href: '/collections/leather',
  },
  {
    id: 'artisan-shoes',
    name: 'Artisan Shoes',
    category: 'Footwear',
    description: 'Made-to-order footwear from family workshops in Spain.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1500&fit=crop',
    itemCount: 42,
    href: '/collections/shoes',
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    category: 'Lifestyle',
    description: 'Curated objects for the considered home.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1500&fit=crop',
    itemCount: 36,
    href: '/collections/home',
  },
]

// Sample product data with Unsplash images
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  badge: string | null
}

const newArrivals: Product[] = [
  {
    id: 'cashmere-coat',
    name: 'Double-Faced Cashmere Coat',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop',
    category: 'Outerwear',
    badge: 'New',
  },
  {
    id: 'silk-blouse',
    name: 'Silk Crepe de Chine Blouse',
    price: 420,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&h=1000&fit=crop',
    category: 'Tops',
    badge: 'New',
  },
  {
    id: 'wool-trousers',
    name: 'Tailored Wool Trousers',
    price: 380,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    category: 'Bottoms',
    badge: null,
  },
  {
    id: 'leather-tote',
    name: 'Structured Leather Tote',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop',
    category: 'Bags',
    badge: 'New',
  },
  {
    id: 'loafer-shoes',
    name: 'Hand-Stitched Penny Loafers',
    price: 580,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=1000&fit=crop',
    category: 'Shoes',
    badge: null,
  },
  {
    id: 'cashmere-scarf',
    name: 'Brushed Cashmere Scarf',
    price: 295,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1000&fit=crop',
    category: 'Accessories',
    badge: 'New',
  },
]

const bestsellers: Product[] = [
  {
    id: 'trench-coat',
    name: 'Classic Cotton Trench Coat',
    price: 1450,
    originalPrice: 1650,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&fit=crop',
    category: 'Outerwear',
    badge: 'Bestseller',
  },
  {
    id: 'cotton-shirt',
    name: 'Organic Cotton Poplin Shirt',
    price: 185,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop',
    category: 'Tops',
    badge: 'Bestseller',
  },
  {
    id: 'leather-belt',
    name: 'Vegetable-Tanned Leather Belt',
    price: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
    category: 'Accessories',
    badge: 'Bestseller',
  },
  {
    id: 'wool-sweater',
    name: 'Merino Wool Crewneck',
    price: 320,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop',
    category: 'Knitwear',
    badge: 'Bestseller',
  },
]

const editorialFeatures = [
  {
    id: 'craftsmanship',
    title: 'The Art of Craftsmanship',
    subtitle: 'Behind the Seams',
    description: 'Journey to the ateliers of Northern Italy where generations of artisans shape each piece by hand.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=1200&fit=crop',
    href: '/stories/craftsmanship',
    cta: 'Read Story',
  },
  {
    id: 'sustainability',
    title: 'Conscious Luxury',
    subtitle: 'Our Commitment',
    description: 'From regenerative fibers to circular design — how we honor the planet without compromising elegance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=1200&fit=crop',
    href: '/stories/sustainability',
    cta: 'Learn More',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section - Full Screen Editorial */}
      <section
        id="hero"
        className="relative min-h-[90vh] lg:min-h-[100vh] flex items-center justify-center bg-ink text-paper overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop"
            alt=""
            fill
            priority
            className="object-cover scale-[1.02] transition-all duration-1000 ease-out hover:scale-[1.05]"
            sizes="100vw"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/60" />
          {/* Noise texture for depth */}
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        </div>

        <div className="container container-prose relative z-10 px-6 py-20 text-center stagger">
          <p className="overline text-gold-400 animate-fade-in" style={{ animationDelay: '0ms' }}>
            Autumn Winter 2024
          </p>
          <h1
            id="hero-heading"
            className="display-lg lg:display-xl font-display font-normal tracking-tight mt-4 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Atelier Store
          </h1>
          <p className="body-lg text-neutral-300 mt-6 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            Curated luxury essentials — where editorial elegance meets modern craftsmanship.
          </p>
          <div className="cluster cluster-lg justify-center mt-10 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link href="/collections" className="btn btn-primary btn-lg">
              Shop Collection
            </Link>
            <Link href="#our-story" className="btn btn-ghost btn-lg text-paper hover:bg-white/10 border-white/20">
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Collections - Editorial Grid */}
      <section
        id="collections"
        className="py-20 lg:py-32 bg-paper"
        aria-labelledby="collections-heading"
      >
        <div className="container container-wide px-6">
          <header className="text-center mb-16 lg:mb-20 stagger">
            <p className="overline text-accent-600">Shop by Category</p>
            <h2 id="collections-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
              Curated Collections
            </h2>
            <p className="body-lg text-neutral-600 mt-6 max-w-2xl mx-auto">
              Each collection is thoughtfully assembled from ateliers across Europe and Japan.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {collections.map((collection, index) => (
              <article
                key={collection.id}
                className="card card-interactive group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={collection.href} className="block" aria-label={`View ${collection.name} - ${collection.itemCount} items`}>
                  <div className="card-media aspect-portrait relative overflow-hidden bg-neutral-100">
                    <Image
                      src={collection.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-outline text-gold-300 border-gold-300">
                        {collection.category}
                      </span>
                    </div>
                    {/* Bottom content */}
                    <div className="absolute inset-0 flex items-end p-6 text-paper">
                      <div className="w-full">
                        <p className="overline text-gold-300 mb-1">{collection.category}</p>
                        <h3 className="headline-lg font-display font-normal mb-2">
                          {collection.name}
                        </h3>
                        <p className="body-sm text-neutral-300/80">{collection.itemCount} items</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="card-body">
                  <p className="body-sm text-neutral-600 line-clamp-2">{collection.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 lg:mt-16 stagger">
            <Link href="/collections" className="btn btn-secondary btn-lg link-arrow">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals - Product Grid */}
      <section
        id="new-arrivals"
        className="py-20 lg:py-32 bg-cream"
        aria-labelledby="new-arrivals-heading"
      >
        <div className="container container-wide px-6">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16 stagger">
            <div>
              <p className="overline text-accent-600">Just In</p>
              <h2 id="new-arrivals-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
                New Arrivals
              </h2>
            </div>
            <Link href="/collections/new-arrivals" className="btn btn-ghost link-arrow text-ink mt-4 md:mt-0 self-end">
              View All
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
            {newArrivals.map((product, index) => (
              <article
                key={product.id}
                className="card card-interactive group xl:col-span-2"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={`/products/${product.id}`} className="block" aria-label={`${product.name} - $${product.price}`}>
                  <div className="card-media aspect-product relative overflow-hidden bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 badge badge-filled badge-accent">
                        {product.badge}
                      </span>
                    )}
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="btn btn-ghost text-paper border-white/30 hover:bg-white/10 px-6 py-3">
                        Quick View
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="card-body">
                  <p className="caption text-accent-600 mb-1">{product.category}</p>
                  <h3 className="headline-sm font-display font-normal truncate-1 mb-2">
                    <Link href={`/products/${product.id}`} className="link-underline hover:text-accent-700">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="inline items-center gap-2">
                    <span className="title-md text-ink">${product.price}</span>
                    {product.originalPrice && (
                      <span className="title-md text-neutral-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers - Product Grid */}
      <section
        id="bestsellers"
        className="py-20 lg:py-32 bg-paper"
        aria-labelledby="bestsellers-heading"
      >
        <div className="container container-wide px-6">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16 stagger">
            <div>
              <p className="overline text-accent-600">Most Loved</p>
              <h2 id="bestsellers-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
                Bestsellers
              </h2>
            </div>
            <Link href="/collections/bestsellers" className="btn btn-ghost link-arrow text-ink mt-4 md:mt-0 self-end">
              View All
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestsellers.map((product, index) => (
              <article
                key={product.id}
                className="card card-interactive group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={`/products/${product.id}`} className="block" aria-label={`${product.name} - $${product.price}`}>
                  <div className="card-media aspect-product relative overflow-hidden bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-3 left-3 badge badge-filled badge-gold">
                      {product.badge}
                    </span>
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="btn btn-ghost text-paper border-white/30 hover:bg-white/10 px-6 py-3">
                        Quick View
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="card-body">
                  <p className="caption text-accent-600 mb-1">{product.category}</p>
                  <h3 className="headline-sm font-display font-normal truncate-1 mb-2">
                    <Link href={`/products/${product.id}`} className="link-underline hover:text-accent-700">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="inline items-center gap-2">
                    <span className="title-md text-ink">${product.price}</span>
                    {product.originalPrice && (
                      <span className="title-md text-neutral-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Features - Storytelling Section */}
      <section
        id="editorial"
        className="py-20 lg:py-32 bg-neutral-50"
        aria-labelledby="editorial-heading"
      >
        <div className="container container-wide px-6">
          <header className="text-center mb-16 lg:mb-20 stagger">
            <p className="overline text-accent-600">The Atelier Journal</p>
            <h2 id="editorial-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3">
              Stories & Craftsmanship
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {editorialFeatures.map((feature, index) => (
              <article
                key={feature.id}
                className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-xl group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Link href={feature.href} className="block h-full" aria-label={`${feature.title} - ${feature.subtitle}`}>
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-8 lg:p-12 text-paper">
                    <div className="max-w-xl">
                      <p className="overline text-gold-300 mb-2">{feature.subtitle}</p>
                      <h3 className="display-sm lg:display-md font-display font-normal tracking-tight mb-4">
                        {feature.title}
                      </h3>
                      <p className="body-lg text-neutral-300/90 mb-6 max-w-md">
                        {feature.description}
                      </p>
                      <span className="btn btn-ghost text-paper border-white/30 hover:bg-white/10 px-6 py-3 link-arrow">
                        {feature.cta}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy / About Section */}
      <section
        id="our-story"
        className="py-20 lg:py-32 bg-cream"
        aria-labelledby="story-heading"
      >
        <div className="container container-wide px-6">
          <div className="grid-asymmetric gap-12 lg:gap-16 items-center">
            <div className="stagger">
              <p className="overline text-accent-700">Our Philosophy</p>
              <h2 id="story-heading" className="display-md lg:display-lg font-display font-normal tracking-tight mt-3 text-ink">
                Crafted for the<br />Modern Connoisseur
              </h2>
              <div className="divider divider-sm mt-6 w-24" />
              <p className="body-lg text-neutral-700 mt-6 max-w-prose">
                Atelier Store was founded on a simple belief: luxury should be
                enduring, not seasonal. Every piece in our collection is selected
                for its craftsmanship, material integrity, and timeless design.
              </p>
              <p className="body-md text-neutral-600 mt-4 max-w-prose">
                We work directly with ateliers across Europe and Japan — places
                where techniques have been refined over generations. No mass
                production. No compromise.
              </p>
              <Link href="/about" className="btn btn-ghost btn-lg mt-8 link-arrow text-ink">
                Read Our Story
              </Link>
            </div>

            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1500&fit=crop"
                alt="Artisan working on leather goods in a sunlit workshop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-end p-8 lg:p-12 text-paper">
                <blockquote className="max-w-md">
                  <p className="body-lg lg:body-xl font-display font-normal text-paper/90">
                    "True luxury is not about excess. It's about the quiet confidence
                    of knowing something was made exceptionally well."
                  </p>
                  <footer className="mt-4 inline-flex items-center gap-2 text-sm text-gold-300">
                    <span className="w-16 h-px bg-gold-400" />
                    <cite className="not-italic">— Founder's Note</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Value Props */}
      <section
        className="py-16 lg:py-24 bg-ink text-paper"
        aria-labelledby="services-heading"
      >
        <div className="container container-wide px-6">
          <header className="text-center mb-12 lg:mb-16 stagger">
            <h2 id="services-heading" className="display-md font-display font-normal tracking-tight">
              Our Services
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                ),
                title: 'Free Worldwide Shipping',
                description: 'Complimentary express delivery on all orders over $500. Duties and taxes included.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <line x1="18" y1="5" x2="18" y2="19" />
                  </svg>
                ),
                title: 'Easy Returns',
                description: '60-day returns with free pickup. Full refund or exchange, no questions asked.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                    <line x1="10" y1="4" x2="10" y2="20" />
                  </svg>
                ),
                title: 'Secure Payment',
                description: 'Encrypted checkout with all major cards, Apple Pay, and Klarna installments.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: 'Personal Styling',
                description: 'Book a virtual or in-store consultation with our style advisors.',
              },
            ].map((service, index) => (
              <div key={index} className="text-center stagger p-6 lg:p-8" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/5 mb-6 text-neutral-300">
                  {service.icon}
                </div>
                <h3 className="headline-sm font-display font-normal text-paper mb-3">{service.title}</h3>
                <p className="body-sm text-neutral-500 max-w-xs mx-auto">{service.description}</p>
              </div>
            ))}
          </div>
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