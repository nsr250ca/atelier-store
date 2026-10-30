'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'New In', href: '/collections/new-arrivals' },
  { label: 'Women', href: '/collections/womens' },
  { label: 'Men', href: '/collections/mens' },
  { label: 'Leather Goods', href: '/collections/leather' },
  { label: 'Gifts', href: '/collections/gifts' },
  { label: 'Stories', href: '/stories' },
]

const UTILITY_LINKS = [
  { label: 'Search', href: '/search' },
  { label: 'Account', href: '/account' },
]

const ANNOUNCEMENT = 'Complimentary Delivery and Returns'

const CART_COUNT = 0

const linkClass =
  'link-underline text-overline font-medium uppercase tracking-[0.16em] text-ink whitespace-nowrap'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`sticky top-0 z-sticky bg-paper transition-shadow duration-300 ease-out ${
        isScrolled ? 'shadow-elevate-2' : ''
      }`}
    >
      {/* Announcement Bar */}
      <div className="border-b border-neutral-200">
        <div className="container container-full px-6 py-2.5">
          <p className="overline text-center tracking-[0.2em] text-neutral-600">
            {ANNOUNCEMENT}
          </p>
        </div>
      </div>

      {/* Primary Bar */}
      <div className="border-b border-neutral-200">
        <div className="container container-full px-6">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-20">
            {/* Left — primary navigation (desktop) / menu toggle (mobile) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="-ml-2 inline-flex h-10 w-10 items-center justify-center text-ink transition-colors duration-150 ease-out hover:text-neutral-600 lg:hidden"
              >
                {isMenuOpen ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                )}
              </button>

              <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkClass}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center — wordmark */}
            <Link href="/" aria-label="Atelier Store — Home" className="justify-self-center">
              <span className="-mr-[0.3em] font-display text-xl uppercase leading-none tracking-[0.3em] lg:text-2xl">
                Atelier
              </span>
            </Link>

            {/* Right — account, search, cart */}
            <div className="flex items-center justify-end gap-5 lg:gap-7">
              {UTILITY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkClass} hidden lg:inline-flex`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/bag" className={linkClass} aria-label={`Bag, ${CART_COUNT} items`}>
                Bag ({CART_COUNT})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-slide-down absolute inset-x-0 top-full max-h-[calc(100vh-6.5rem)] overflow-y-auto border-b border-neutral-200 bg-paper px-6 py-6 shadow-elevate-3 lg:hidden"
        >
          <ul className="stack">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-overline font-medium uppercase tracking-[0.16em] text-ink"
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="divider divider-sm" />

          <ul className="stack">
            {UTILITY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-overline font-medium uppercase tracking-[0.16em] text-neutral-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
