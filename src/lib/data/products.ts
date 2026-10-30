export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
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
  colors: { name: string; hex: string; images: string[] }[]
  sizes: string[]
}

const productImages: Record<string, string[]> = {
  'cashmere-coat': [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1500&fit=crop',
  ],
  'silk-blouse': [
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1200&h=1500&fit=crop',
  ],
  'wool-trousers': [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1506619916579-9d11e40051e8?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=1500&fit=crop',
  ],
  'leather-tote': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&h=1500&fit=crop',
  ],
  'loafer-shoes': [
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&h=1500&fit=crop',
  ],
  'cashmere-scarf': [
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&h=1500&fit=crop',
  ],
  'trench-coat': [
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&h=1500&fit=crop',
  ],
  'cotton-shirt': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&h=1500&fit=crop',
  ],
  'leather-belt': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1500&fit=crop',
  ],
  'wool-sweater': [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=1500&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=1500&fit=crop',
  ],
}

export const products: Product[] = [
  {
    id: 'cashmere-coat',
    name: 'Double-Faced Cashmere Coat',
    price: 1850,
    images: productImages['cashmere-coat'],
    category: 'Outerwear',
    badge: 'New',
    description:
      'A masterpiece of Italian tailoring, this double-faced cashmere coat is crafted from the finest fibers sourced from the high plateaus of Mongolia. Each coat requires the underdown of four cashmere goats and takes our artisans three weeks to complete. The double-faced construction means no lining is needed — the interior is as beautiful as the exterior, with hand-finished edges throughout.',
    details: [
      'Double-faced construction — no lining required',
      'Hand-finished edges and seams',
      'Horn buttons from sustainable sources',
      'Interior welt pockets',
      'Center back vent for movement',
    ],
    features: [
      '100% Grade A Mongolian cashmere (14.5 microns)',
      'Weight: 420g/m² — substantial yet lightweight',
      'Made in Biella, Italy by fourth-generation artisans',
      'Each piece individually numbered',
    ],
    materials: '100% Mongolian Cashmere. Buttons: Natural Horn.',
    care: 'Dry clean only. Store folded with cedar blocks. Avoid hanging for extended periods.',
    origin: 'Woven and tailored in Biella, Italy',
    stock: 12,
    sku: 'ATL-CC-001',
    colors: [
      { name: 'Camel', hex: '#C19A6B', images: productImages['cashmere-coat'] },
      { name: 'Charcoal', hex: '#36454F', images: productImages['cashmere-coat'] },
      { name: 'Cream', hex: '#F5F5DC', images: productImages['cashmere-coat'] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'silk-blouse',
    name: 'Silk Crepe de Chine Blouse',
    price: 420,
    images: productImages['silk-blouse'],
    category: 'Tops',
    badge: 'New',
    description:
      'Cut from luxurious silk crepe de chine with a subtle matte finish, this blouse drapes elegantly while maintaining structure. The relaxed silhouette features a concealed placket, French cuffs, and a gently curved hem that sits perfectly over trousers or tucked into a skirt. A wardrobe essential that transitions seamlessly from day to evening.',
    details: [
      'Concealed button placket',
      'French cuffs with mother-of-pearl buttons',
      'Curved hem — longer at back',
      'Relaxed, fluid silhouette',
      'Rolls beautifully for travel',
    ],
    features: [
      '100% Silk Crepe de Chine (16 momme)',
      'OEKO-TEX® Standard 100 certified',
      'Made in Como, Italy',
      'Naturally temperature-regulating',
    ],
    materials: '100% Silk. Buttons: Mother-of-Pearl.',
    care: 'Dry clean recommended. Cool hand wash possible. Iron on low heat inside out.',
    origin: 'Woven and tailored in Como, Italy',
    stock: 28,
    sku: 'ATL-SB-002',
    colors: [
      { name: 'Ivory', hex: '#FFFFF0', images: productImages['silk-blouse'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['silk-blouse'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['silk-blouse'] },
      { name: 'Blush', hex: '#F4C2C2', images: productImages['silk-blouse'] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'wool-trousers',
    name: 'Tailored Wool Trousers',
    price: 380,
    images: productImages['wool-trousers'],
    category: 'Bottoms',
    badge: null,
    description:
      'Expertly tailored from Super 120s merino wool with a touch of stretch for comfort, these trousers feature a mid-rise waist, clean front pleats, and a tapered leg that creates a modern, elongated silhouette. The waistband includes hidden elastic for all-day comfort and side adjusters for a precise fit. Unfinished hem allows for custom tailoring.',
    details: [
      'Single front pleat',
      'Side waist adjusters',
      'Hidden elastic waistband',
      'Slant front pockets',
      'Double-welt back pockets (buttoned)',
      'Unfinished hem for custom length',
    ],
    features: [
      '98% Super 120s Merino Wool, 2% Elastane',
      'Weight: 240g/m² — four-season weight',
      'Made in Portugal',
      'Natural stretch for comfort',
    ],
    materials: '98% Merino Wool, 2% Elastane. Lining: 100% Cupro.',
    care: 'Dry clean only. Press with steam. Store on trouser hangers with clamps.',
    origin: 'Tailored in Porto, Portugal',
    stock: 45,
    sku: 'ATL-WT-003',
    colors: [
      { name: 'Charcoal', hex: '#36454F', images: productImages['wool-trousers'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['wool-trousers'] },
      { name: 'Mid Grey', hex: '#8B8B8B', images: productImages['wool-trousers'] },
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
  },
  {
    id: 'leather-tote',
    name: 'Structured Leather Tote',
    price: 1250,
    images: productImages['leather-tote'],
    category: 'Bags',
    badge: 'New',
    description:
      'Handcrafted in Florence from vegetable-tanned Tuscan leather that develops a rich patina over time. This structured tote features a reinforced base with protective feet, a detachable interior zip pouch, and comfortable rolled handles with a 25cm drop. The magnetic closure keeps contents secure while maintaining a clean silhouette. Spacious enough for a 13" laptop and daily essentials.',
    details: [
      'Magnetic top closure',
      'Detachable interior zip pouch (leather)',
      'Protective metal feet on base',
      'Rolled handles (25cm drop)',
      'Interior: one zip pocket, two slip pockets',
      'Fits 13" laptop, A4 documents',
    ],
    features: [
      '100% Vegetable-tanned Tuscan calfskin',
      'Unlined — leather interior',
      'Solid brass hardware',
      'Hand-stitched handles',
      'Made in Florence, Italy',
    ],
    materials: 'Exterior: Vegetable-tanned calfskin. Hardware: Solid brass. Interior: Same leather.',
    care: 'Condition with neutral leather cream every 3-6 months. Avoid prolonged sun exposure. Store in dust bag.',
    origin: 'Handcrafted in Florence, Italy',
    stock: 8,
    sku: 'ATL-LT-004',
    colors: [
      { name: 'Cognac', hex: '#9A463D', images: productImages['leather-tote'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['leather-tote'] },
      { name: 'Dark Green', hex: '#1B3A2F', images: productImages['leather-tote'] },
    ],
    sizes: ['One Size'],
  },
  {
    id: 'loafer-shoes',
    name: 'Hand-Stitched Penny Loafers',
    price: 580,
    images: productImages['loafer-shoes'],
    category: 'Shoes',
    badge: null,
    description:
      'A timeless penny loafer hand-stitched in Almansa, Spain using the traditional Goodyear welt construction. Made from premium box calf leather with a leather sole and rubber heel insert for grip. The vamp features the classic saddle strap with hand-cut diamond. Fully leather-lined with a cushioned insole for all-day comfort. These will mold to your feet over time, becoming uniquely yours.',
    details: [
      'Goodyear welt construction — resoleable',
      'Hand-stitched saddle strap',
      'Leather sole with rubber heel insert',
      'Full leather lining',
      'Cushioned leather insole',
      'Beveled waist for elegant profile',
    ],
    features: [
      'Box calf leather (French origin)',
      'Leather sole, rubber heel',
      'Goodyear welt — resoleable 3-4 times',
      'Made in Almansa, Spain',
      'Includes lasted shoe trees',
    ],
    materials: 'Upper: Box calf leather. Lining: Calf leather. Sole: Leather with rubber heel.',
    care: 'Use shoe trees daily. Polish with cream polish. Condition leather monthly. Rotate wear.',
    origin: 'Handcrafted in Almansa, Spain',
    stock: 32,
    sku: 'ATL-LS-005',
    colors: [
      { name: 'Dark Brown', hex: '#4A2C2A', images: productImages['loafer-shoes'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['loafer-shoes'] },
      { name: 'Burgundy', hex: '#800020', images: productImages['loafer-shoes'] },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'cashmere-scarf',
    name: 'Brushed Cashmere Scarf',
    price: 295,
    images: productImages['cashmere-scarf'],
    category: 'Accessories',
    badge: 'New',
    description:
      'Woven on traditional looms in the Scottish Borders, this oversized scarf is made from the finest cashmere fibers brushed to an incredibly soft hand. The generous dimensions allow for versatile styling — worn as a classic wrap, draped over shoulders, or knotted. Finished with hand-rolled edges and subtle fringe. A companion for life that only improves with age.',
    details: [
      'Oversized dimensions: 70 x 200 cm',
      'Hand-rolled edges',
      'Hand-twisted fringe',
      'Double-faced weave',
      'Packable — rolls to minimal volume',
    ],
    features: [
      '100% Grade A Mongolian Cashmere',
      'Weight: 280g — substantial warmth without bulk',
      'Woven in Scottish Borders, UK',
      'Heirloom quality — lasts decades',
    ],
    materials: '100% Mongolian Cashmere.',
    care: 'Hand wash cold with cashmere shampoo. Dry flat. Store folded with cedar.',
    origin: 'Woven in the Scottish Borders, United Kingdom',
    stock: 65,
    sku: 'ATL-CS-006',
    colors: [
      { name: 'Oatmeal', hex: '#D9D9C9', images: productImages['cashmere-scarf'] },
      { name: 'Charcoal', hex: '#36454F', images: productImages['cashmere-scarf'] },
      { name: 'Camel', hex: '#C19A6B', images: productImages['cashmere-scarf'] },
      { name: 'Sage', hex: '#8A9A5B', images: productImages['cashmere-scarf'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['cashmere-scarf'] },
    ],
    sizes: ['One Size'],
  },
  {
    id: 'trench-coat',
    name: 'Classic Cotton Trench Coat',
    price: 1450,
    originalPrice: 1650,
    images: productImages['trench-coat'],
    category: 'Outerwear',
    badge: 'Bestseller',
    description:
      'The definitive trench coat, reimagined for the modern wardrobe. Crafted from a dense cotton gabardine woven in England — the same fabric originally developed for military officers. Features include a storm flap, gun flap, epaulettes, belted waist with D-ring details, and a removable wool blend liner for three-season versatility. Every detail considered, from the adjustable cuff straps to the vented back yoke.',
    details: [
      'Double-breasted with 10 horn buttons',
      'Storm flap and gun flap',
      'Epaulettes with button closure',
      'Self-tie belt with D-rings',
      'Adjustable cuff straps',
      'Vented back yoke for movement',
      'Removable wool blend liner (button-in)',
      'Interior document pocket',
    ],
    features: [
      '100% Cotton Gabardine (320g/m²)',
      'Water-repellent finish (PFC-free)',
      'Liner: 70% Wool, 30% Polyester',
      'Made in England',
      'Three-season versatility',
    ],
    materials: 'Shell: 100% Cotton Gabardine. Liner: 70% Wool, 30% Polyester. Buttons: Horn.',
    care: 'Shell: Specialist clean. Liner: Dry clean. Reproof annually for water resistance.',
    origin: 'Made in Manchester, England',
    stock: 18,
    sku: 'ATL-TC-007',
    colors: [
      { name: 'Khaki', hex: '#C3B091', images: productImages['trench-coat'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['trench-coat'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['trench-coat'] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'cotton-shirt',
    name: 'Organic Cotton Poplin Shirt',
    price: 185,
    images: productImages['cotton-shirt'],
    category: 'Tops',
    badge: 'Bestseller',
    description:
      'The perfect white shirt — crisp, substantial, and impossibly soft. Woven from GOTS-certified organic cotton poplin in Portugal, this shirt features a slightly relaxed fit with a curved hem, mother-of-pearl buttons, and a split yoke for superior shoulder fit. The collar is unstructured for a modern, relaxed drape. Pre-washed for zero shrinkage.',
    details: [
      'Split yoke construction',
      'Mother-of-pearl buttons',
      'Curved hem — tucks or untucked',
      'Unstructured collar (no fusing)',
      'Single-needle stitching (22 spi)',
      'Side gussets for durability',
    ],
    features: [
      '100% GOTS Organic Cotton Poplin',
      'Weight: 135g/m² — substantial but breathable',
      'Pre-washed — zero shrinkage',
      'Made in Portugal',
      'OEKO-TEX® Standard 100',
    ],
    materials: '100% Organic Cotton. Buttons: Mother-of-Pearl.',
    care: 'Machine wash 30°C. Iron damp for best results. Do not tumble dry.',
    origin: 'Woven and tailored in Portugal',
    stock: 120,
    sku: 'ATL-CS-008',
    colors: [
      { name: 'White', hex: '#FFFFFF', images: productImages['cotton-shirt'] },
      { name: 'Light Blue', hex: '#A8D0E6', images: productImages['cotton-shirt'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['cotton-shirt'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['cotton-shirt'] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'leather-belt',
    name: 'Vegetable-Tanned Leather Belt',
    price: 145,
    images: productImages['leather-belt'],
    category: 'Accessories',
    badge: 'Bestseller',
    description:
      'A belt that tells a story. Made from a single strip of full-grain vegetable-tanned Italian leather, this 3.5cm belt develops a beautiful patina unique to its wearer. The solid brass buckle is hand-finished with a subtle brushed texture. Five holes spaced at 2.5cm intervals, with the center hole positioned for a true-to-size fit. Edges are hand-burnished and sealed.',
    details: [
      'Width: 3.5cm (1 3/8")',
      'Solid brass buckle (nickel-free)',
      'Five holes at 2.5cm intervals',
      'Hand-burnished edges',
      'Single piece of full-grain leather',
      'Stamped with size and origin',
    ],
    features: [
      'Full-grain vegetable-tanned Italian leather',
      'Solid brass hardware',
      'Made in Tuscany, Italy',
      'Ages beautifully — develops rich patina',
      'Lifetime guarantee on craftsmanship',
    ],
    materials: '100% Vegetable-tanned full-grain leather. Buckle: Solid brass.',
    care: 'Condition with leather cream. Avoid water. Patina develops naturally.',
    origin: 'Handcrafted in Tuscany, Italy',
    stock: 85,
    sku: 'ATL-LB-009',
    colors: [
      { name: 'Tan', hex: '#D2B48C', images: productImages['leather-belt'] },
      { name: 'Cognac', hex: '#9A463D', images: productImages['leather-belt'] },
      { name: 'Black', hex: '#0A0A0A', images: productImages['leather-belt'] },
      { name: 'Dark Brown', hex: '#4A2C2A', images: productImages['leather-belt'] },
    ],
    sizes: ['80', '85', '90', '95', '100', '105', '110'],
  },
  {
    id: 'wool-sweater',
    name: 'Merino Wool Crewneck',
    price: 320,
    images: productImages['wool-sweater'],
    category: 'Knitwear',
    badge: 'Bestseller',
    description:
      'The essential merino crewneck, knitted on vintage machines in Scotland from ultrafine 18.5 micron merino. The dense, even stitch structure resists pilling while maintaining exceptional softness. Ribbed collar, cuffs, and hem hold their shape. A versatile layering piece that works equally well under a blazer or on its own. Pre-washed for a lived-in feel from day one.',
    details: [
      'Set-in sleeves',
      'Ribbed collar, cuffs, and hem (2x2 rib)',
      'Reinforced shoulder seams',
      'Side seams for structure',
      'Pre-washed for softness',
    ],
    features: [
      '100% Ultrafine Merino Wool (18.5 microns)',
      'Weight: 280g — mid-weight',
      'Knit in Hawick, Scotland',
      'Naturally odor-resistant',
      'Temperature-regulating',
    ],
    materials: '100% Merino Wool.',
    care: 'Hand wash cold or machine wool cycle. Dry flat. Store folded with cedar.',
    origin: 'Knit in Hawick, Scottish Borders',
    stock: 95,
    sku: 'ATL-MS-010',
    colors: [
      { name: 'Oatmeal', hex: '#D9D9C9', images: productImages['wool-sweater'] },
      { name: 'Navy', hex: '#001F3F', images: productImages['wool-sweater'] },
      { name: 'Charcoal', hex: '#36454F', images: productImages['wool-sweater'] },
      { name: 'Forest Green', hex: '#1B3A2F', images: productImages['wool-sweater'] },
      { name: 'Burgundy', hex: '#800020', images: productImages['wool-sweater'] },
      { name: 'Cream', hex: '#F5F5DC', images: productImages['wool-sweater'] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getAllProducts(): Product[] {
  return products
}

export function getRelatedProducts(id: string, limit = 4): Product[] {
  const product = getProductById(id)
  if (!product) return []

  return products
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, limit)
}