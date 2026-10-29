# Atelier Store — Design System

> A luxury fashion eCommerce design system inspired by editorial elegance (Gucci-style sophistication).

---

## Design Philosophy

This design system draws inspiration from **Gucci's editorial aesthetic** — characterized by:
- **Sophisticated typography**: Editorial serif headlines paired with clean sans-serif UI
- **Generous whitespace**: Breathing room that feels luxurious, not empty
- **Minimal UI chrome**: Hairline borders, subtle shadows, text-based interactions
- **Refined color palette**: Deep neutrals with a signature accent (emerald) and gold highlights
- **Editorial layouts**: Asymmetric grids, strong visual hierarchy, magazine-style compositions

---

## Files Changed

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Complete design token system (colors, typography, spacing, shadows, animations, etc.) |
| `src/app/globals.css` | Base styles, CSS variables, component classes, utilities |
| `src/app/layout.tsx` | Google Fonts integration (Playfair Display, Inter, JetBrains Mono) |
| `src/app/page.tsx` | Demonstration of the design system in action |

---

## Design Tokens

### Color System

**Core Neutrals (Warm Grays)**
```
neutral-25  #fafafa  — Subtle backgrounds
neutral-50  #f5f5f5  — Page backgrounds
neutral-100 #ececec  — Card backgrounds
neutral-200 #d9d9d9  — Borders, dividers
neutral-300 #bdbdbd  — Disabled states
neutral-400 #9e9e9e  — Placeholder text
neutral-500 #757575  — Secondary text
neutral-600 #5c5c5c  — Body text (dark mode)
neutral-700 #484848  — Headings (dark mode)
neutral-800 #3a3a3a  — Strong text
neutral-900 #262626  — Near black
neutral-950 #141414  — Pure black alternative
```

**Editorial Colors**
```
ink     #0a0a0a  — Primary text, primary buttons
paper   #fafafa  — Primary background
cream   #fdfcf7  — Warm section backgrounds
```

**Signature Accent (Emerald - Luxury Green)**
```
accent-50  #f0f7f4  — Subtle backgrounds
accent-100 #dceadf  — Hover states
accent-500 #3d824f  — Primary accent
accent-600 #2f683f  — Buttons, links (primary)
accent-700 #265032  — Hover states
accent-900 #1d3525  — Dark sections
```

**Gold Highlight**
```
gold-400  #eac088  — Decorative lines, highlights
gold-500  #d8862f  — CTAs, badges
gold-600  #c46d1f  — Hover states
```

### Typography

**Font Families**
- **Display**: `Playfair Display` — Editorial serif for headlines (Gucci-style elegance)
- **Sans**: `Inter` — Clean, modern UI font for body text
- **Mono**: `JetBrains Mono` — Code, technical content

**Fluid Type Scale (clamp-based, responsive)**
| Token | Size | Line Height | Letter Spacing | Weight | Use Case |
|-------|------|-------------|----------------|--------|----------|
| `display-xl` | clamp(3.5rem, 8vw, 7rem) | 1.05 | -0.03em | 400 | Hero headlines |
| `display-lg` | clamp(2.5rem, 5vw, 4.5rem) | 1.1 | -0.02em | 400 | Section headlines |
| `display-md` | clamp(2rem, 4vw, 3.5rem) | 1.15 | -0.01em | 400 | Page titles |
| `display-sm` | clamp(1.5rem, 3vw, 2.25rem) | 1.2 | 0 | 400 | Card headlines |
| `headline-lg` | clamp(1.5rem, 2.5vw, 2rem) | 1.25 | 0 | 500 | UI headlines |
| `headline-md` | clamp(1.25rem, 2vw, 1.5rem) | 1.3 | 0 | 500 | Sub-headlines |
| `headline-sm` | clamp(1.125rem, 1.5vw, 1.25rem) | 1.35 | 0 | 500 | Small headlines |
| `body-lg` | 1.125rem | 1.7 | 0 | 400 | Lead paragraphs |
| `body-md` | 1rem | 1.65 | 0 | 400 | Body text |
| `body-sm` | 0.875rem | 1.6 | 0 | 400 | Secondary text |
| `caption` | 0.75rem | 1.5 | 0.02em | 400 | Captions, metadata |
| `overline` | 0.6875rem | 1.5 | 0.1em | 500 | Categories, labels |

### Spacing Scale (4px base)

| Token | Value | Use Case |
|-------|-------|----------|
| `1` | 4px | Tight gaps |
| `2` | 8px | Standard gaps |
| `3` | 12px | Form spacing |
| `4` | 16px | Base unit |
| `5` | 20px | Component padding |
| `6` | 24px | Section gaps |
| `8` | 32px | Large gaps |
| `10` | 40px | Section padding |
| `12` | 48px | Large sections |
| `16` | 64px | Hero sections |
| `20` | 80px | Page margins |
| `24` | 96px | Large page margins |
| `32` | 128px | Hero height |

### Container Max-Widths

| Token | Value | Use Case |
|-------|-------|----------|
| `prose` | 42rem (672px) | Optimal reading width |
| `content` | 56rem (896px) | Standard content |
| `wide` | 72rem (1152px) | Wide layouts |
| `full` | 80rem (1280px) | Full-width layouts |

### Border Radius

| Token | Value |
|-------|-------|
| `hairline` | 1px |
| `xs` | 2px |
| `sm` | 4px |
| `md` (DEFAULT) | 6px |
| `lg` | 8px |
| `xl` | 12px |
| `2xl` | 16px |
| `full` | 9999px |

### Shadows (Layered Depth)

| Token | Use Case |
|-------|----------|
| `hairline` | Dividers, subtle separation |
| `xs` | Cards at rest |
| `sm` | Buttons, inputs |
| `md` | Elevated cards |
| `lg` | Hover states, dropdowns |
| `xl` | Modals, popovers |
| `elevate-1` to `elevate-4` | Progressive elevation |

### Transitions

| Duration | Timing Function | Use Case |
|----------|----------------|----------|
| `150ms` | `ease-out` | Color changes, simple hovers |
| `250ms` | `ease-out` | Standard transitions |
| `350ms` | `ease-in-out` | Complex state changes |
| `500ms` | `spring-gentle` | Reveal animations |
| `700ms` | `spring-snappy` | Page transitions |

---

## Component Classes

### Buttons

```html
<!-- Primary - Filled ink -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary - Outlined -->
<button class="btn btn-secondary">Secondary</button>

<!-- Ghost - Text only -->
<button class="btn btn-ghost">Ghost</button>

<!-- Accent - Brand color -->
<button class="btn btn-accent">Accent</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>

<!-- Full width -->
<button class="btn btn-full">Full Width</button>
```

### Cards

```html
<!-- Basic card -->
<article class="card">
  <div class="card-media aspect-product">
    <img src="..." alt="" class="img-cover" />
  </div>
  <div class="card-body">
    <h3 class="headline-sm">Product Name</h3>
  </div>
</article>

<!-- Interactive card (hover effects) -->
<article class="card card-interactive">
  ...
</article>

<!-- Elevated card (shadow, no border) -->
<article class="card card-elevated">
  ...
</article>
```

### Layout Primitives

```html
<!-- Vertical stack -->
<div class="stack">           <!-- gap-4 -->
<div class="stack-sm">        <!-- gap-2 -->
<div class="stack-lg">        <!-- gap-6 -->
<div class="stack-xl">        <!-- gap-8 -->
<div class="stack-2xl">       <!-- gap-12 -->

<!-- Horizontal inline -->
<div class="inline">          <!-- gap-4 -->
<div class="inline-sm">       <!-- gap-2 -->
<div class="inline-lg">       <!-- gap-6 -->

<!-- Editorial grid (responsive) -->
<div class="grid-editorial">  <!-- 1 col → 2 col @md → 3 col @xl -->

<!-- Asymmetric grid (featured + list) -->
<div class="grid-asymmetric"> <!-- 1.5fr + 1fr @lg -->

<!-- Sidebar layout -->
<div class="grid-sidebar">    <!-- 1fr + 280px @lg -->

<!-- Wrapping cluster -->
<div class="cluster">         <!-- flex-wrap, gap-3 -->
```

### Links

```html
<!-- Underline animation -->
<a href="#" class="link-underline">Hover for underline</a>

<!-- Arrow link -->
<a href="#" class="link-arrow">Read more</a>

<!-- Navigation link -->
<a href="#" class="nav-link" aria-current="page">Active</a>
<a href="#" class="nav-link-subtle">Secondary</a>
```

### Badges

```html
<span class="badge badge-outline badge-accent">New</span>
<span class="badge badge-filled badge-gold">Exclusive</span>
<span class="badge badge-outline badge-ink">Sold Out</span>
<span class="badge badge-outline badge-muted">Pre-order</span>
```

### Dividers

```html
<hr class="divider" />           <!-- Standard -->
<hr class="divider-sm" />        <!-- Small margin -->
<hr class="divider-lg" />        <!-- Large margin -->
<hr class="divider-xl" />        <!-- Extra large margin -->
<hr class="divider-vertical" />  <!-- Vertical -->
```

---

## Animation Classes

```html
<!-- Entrance animations -->
<div class="animate-fade-in">Fade in</div>
<div class="animate-slide-up">Slide up</div>
<div class="animate-slide-down">Slide down</div>
<div class="animate-reveal">Reveal (clip-path)</div>

<!-- Staggered children -->
<div class="stagger">
  <div>First (0ms)</div>
  <div>Second (80ms)</div>
  <div>Third (160ms)</div>
  <!-- ... up to 6 children -->
</div>
```

---

## Skeleton Loading

```html
<div class="skeleton skeleton-text h-4 w-3/4" />
<div class="skeleton skeleton-title h-6 w-1/2" />
<div class="skeleton aspect-product" />
<div class="skeleton-card">
  <div class="skeleton aspect-product" />
  <div class="p-4 space-y-3">
    <div class="skeleton skeleton-title" />
    <div class="skeleton skeleton-text" />
    <div class="skeleton skeleton-text w-3/4" />
  </div>
</div>
```

---

## Responsive Breakpoints

| Breakpoint | Value | Use Case |
|------------|-------|----------|
| `xs` | 375px | Mobile |
| `sm` | 640px | Large mobile / small tablet |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1440px | Wide desktop |
| `3xl` | 1680px | Ultra-wide |
| `4xl` | 1920px | 4K |

---

## Usage Examples

### Hero Section
```tsx
<section className="relative min-h-[90vh] flex items-center justify-center bg-ink text-paper">
  <div className="absolute inset-0 bg-gradient-accent opacity-10" aria-hidden="true" />
  <div className="container container-prose relative z-10 px-6 py-20 text-center stagger">
    <p className="overline text-gold-400">New Collection</p>
    <h1 className="display-lg font-display font-normal tracking-tight mt-4">
      Atelier Store
    </h1>
    <p className="body-lg text-neutral-300 mt-6 max-w-xl mx-auto">
      Curated luxury essentials...
    </p>
    <div className="cluster cluster-lg justify-center mt-10">
      <a href="#" className="btn btn-primary btn-lg">Shop Collection</a>
      <a href="#" className="btn btn-ghost btn-lg text-paper hover:bg-white/10">Our Story</a>
    </div>
  </div>
</section>
```

### Product Grid
```tsx
<div className="grid-editorial gap-8">
  {products.map(product => (
    <article key={product.id} className="card card-interactive group">
      <div className="card-media aspect-product relative overflow-hidden bg-neutral-100">
        <Image src={product.image} alt={product.name} fill className="img-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
      </div>
      <div className="card-body">
        <p className="overline text-accent-600">{product.category}</p>
        <h3 className="headline-sm font-display font-normal mt-1">{product.name}</h3>
        <p className="title-md text-accent-700 mt-2">${product.price}</p>
      </div>
    </article>
  ))}
</div>
```

### Form
```tsx
<form className="stack-lg max-w-md">
  <div>
    <label htmlFor="email" className="title-sm">Email</label>
    <input
      type="email"
      id="email"
      className="mt-2 border-neutral-300 focus:border-ink focus:ring-accent-500/40"
      placeholder="you@example.com"
      required
    />
  </div>
  <button type="submit" className="btn btn-primary btn-full btn-lg mt-4">
    Subscribe
  </button>
</form>
```

---

## Accessibility

- **Focus visible**: All interactive elements have visible focus rings (`--focus-ring`)
- **Reduced motion**: Respects `prefers-reduced-motion`
- **Color contrast**: All combinations meet WCAG AA
- **Semantic HTML**: Proper heading hierarchy, landmarks, labels
- **Skip link**: Included in globals.css for keyboard navigation

---

## Dark Mode

The system supports dark mode via `prefers-color-scheme: media query`:
- `ink` → `#fafafa` (light text)
- `paper` → `#0a0a0a` (dark background)
- `cream` → `#141414` (dark warm background)
- Neutrals invert appropriately
- Accent colors remain consistent

To extend with class-based dark mode, add `.dark` class variants in `tailwind.config.ts`.

---

## Extending the System

### Adding New Colors
```typescript
// tailwind.config.ts
colors: {
  // ... existing
  brand: {
    500: '#your-color',
    // ...
  }
}
```

### Adding New Font Sizes
```typescript
fontSize: {
  // ... existing
  'display-2xl': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
}
```

### Adding New Components
Add to `globals.css` under `/* --- Components --- */` section using `@layer components`.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

Uses modern CSS features: `clamp()`, `aspect-ratio`, `color-mix()`, `:focus-visible`, `text-wrap: balance/pretty`.

---

## Performance

- Fonts loaded with `preconnect` and `display=swap`
- CSS variables for theming (no runtime overhead)
- Utility-first: only used classes ship to production
- Animations use `transform`/`opacity` for GPU acceleration

---

*Design System v1.0 — Atelier Store*