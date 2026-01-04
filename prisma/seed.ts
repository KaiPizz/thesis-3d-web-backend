/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data in correct order (respect foreign keys)
  console.log('🗑️  Clearing existing data...');
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  console.log('📁 Creating categories...');
  const chairsCategory = await prisma.category.create({
    data: {
      name: 'Chairs',
      slug: 'chairs',
    },
  });

  const armchairsCategory = await prisma.category.create({
    data: {
      name: 'Armchairs',
      slug: 'armchairs',
    },
  });

  const lampCategory = await prisma.category.create({
    data: {
      name: 'Lamps',
      slug: 'lamps',
    },
  });

  const tablesCategory = await prisma.category.create({
    data: {
      name: "Tables",
      slug: "tables",
    },
  });

  const sculpturesCategory = await prisma.category.create({
    data: {
      name: "Sculptures",
      slug: "sculptures",
    },
  });

  const desksCategory = await prisma.category.create({
    data: {
      name: "Desks",
      slug: "desks",
    },
  });  
  
  console.log('Creating products and variants...');

  const now = new Date();

  // Product 1: Wooden Dining Chair
  const diningChair = await prisma.product.create({
    data: {
      name: 'Wooden Dining Chair',
      slug: 'wooden-dining-chair',
      description:
        'A handcrafted wooden dining chair featuring traditional carved details, spindle legs, and a warm natural finish.',
      categoryId: chairsCategory.id,
      modelUrl: 'models/dining-chair.glb',
      thumbnailUrl: '/thumbnails/dining-chair.webp',
      baseColor: '#8B5A2B',
      isFeatured: false,
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 45,
      heightCm: 92,
      depthCm: 52,
      weightKg: 5.8,
      material: 'Solid oak wood',
      maxLoadKg: 120,
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: diningChair.id,
        name: 'Warm Walnut',
        colorHex: '#8B5A2B',
        isDefault: true,
      },
      {
        productId: diningChair.id,
        name: 'Dark Mahogany',
        colorHex: '#4A2C1D',
        isDefault: false,
      },
    ],
  });

  // Product 2: Ergonomic Office Chair 
  const officeChair = await prisma.product.create({
    data: {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description:
        'Professional ergonomic chair with lumbar support and adjustable armrests. Designed for long work sessions.',
      categoryId: chairsCategory.id,
      modelUrl: 'models/office-chair.glb',
      thumbnailUrl: '/thumbnails/office-chair.webp',
      baseColor: '#4A4F57',
      isFeatured: true,
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 68,
      heightCm: 115,
      depthCm: 70,
      weightKg: 14.5,
      material: 'Mesh fabric, aluminum frame',
      maxLoadKg: 150,
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: officeChair.id,
        name: 'Storm Gray',
        colorHex: '#4A4F57',
        isDefault: true,
      },
      {
        productId: officeChair.id,
        name: 'Steel Gray',
        colorHex: '#6B7280',
        isDefault: false,
      },
    ],
  });

  // Product 3: Classic Velvet Armchair 
  const velvetArmchair = await prisma.product.create({
    data: {
      name: 'Classic Velvet Armchair',
      slug: 'classic-velvet-armchair',
      description:
        'Luxurious velvet armchair with deep cushioning and elegant curved arms. A statement piece for any living room.',
      categoryId: armchairsCategory.id,
      modelUrl: 'models/velvet-armchair.glb',
      thumbnailUrl: '/thumbnails/velvet-armchair.webp',
      useOriginalColor: true,
      originalColorName: 'Moss Green',
      originalColorPreview: '#83844B',
      isFeatured: true,
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 78,
      heightCm: 85,
      depthCm: 82,
      weightKg: 22,
      material: 'Velvet upholstery, beech wood legs',
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: velvetArmchair.id,
        name: 'Olive Moss',
        colorHex: '#6E7745',
        isDefault: true,
      },
      {
        productId: velvetArmchair.id,
        name: 'Graphite Gray',
        colorHex: '#4F5450',
        isDefault: false,
      },
    ],
  });

  // Product 4: Scandinavian Lounge Armchair
  const loungeArmchair = await prisma.product.create({
    data: {
      name: 'Scandinavian Lounge Armchair',
      slug: 'scandinavian-lounge-armchair',
      description:
        'Minimalist Scandinavian design with natural wood frame and premium fabric upholstery. Timeless comfort meets modern aesthetics.',
      categoryId: armchairsCategory.id,
      modelUrl: 'models/lounge-armchair.glb',
      thumbnailUrl: '/thumbnails/lounge-armchair.webp',
      baseColor: '#C7C4BD',
      isFeatured: false,
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 72,
      heightCm: 76,
      depthCm: 80,
      weightKg: 18,
      material: 'Cotton-linen blend, ash wood frame',
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: loungeArmchair.id,
        name: 'Royal Azure',
        colorHex: '#315fb5',
        isDefault: false,
      },
      {
        productId: loungeArmchair.id,
        name: 'Mushroom Grey',
        colorHex: '#C7C4BD',
        isDefault: true,
      },
    ],
  });

  // Product 5: Dog Lamp
  const bigDogLamp = await prisma.product.create({
    data: {
      name: 'Big Dog Lamp',                   
      slug: 'big-dog-lamp',                   
      description: 'A modern sculptural floor lamp featuring a sleek matte-black dog silhouette with a minimalist lampshade.',
      categoryId: lampCategory.id,           
      modelUrl: 'models/big-dog-lamp.glb',        
      thumbnailUrl: '/thumbnails/big-dog-lamp.webp',
      baseColor: '#000000',   
      isFeatured: true,                       
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 35,
      heightCm: 145,
      depthCm: 40,
      weightKg: 6.2,
      material: 'Resin body, fabric lampshade',
    },
  });
    
  // Product 6: Small Dog Lamp
  const smallDogLamp = await prisma.product.create({
    data: {
      name: 'Small Dog Lamp',                   
      slug: 'small-dog-lamp',                   
      description: 'A quirky black dog-shaped table lamp featuring a matte sculpture-style body, a black fabric lampshade, and a playful poop-shaped power switch.',
      categoryId: lampCategory.id,           
      modelUrl: 'models/small-dog-lamp.glb',        
      thumbnailUrl: '/thumbnails/small-dog-lamp.webp',
      useOriginalColor: true,           
      isFeatured: false,                       
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 18,
      heightCm: 42,
      depthCm: 22,
      weightKg: 1.8,
      material: 'Resin body, fabric lampshade',
    },
  });


  // Product 7 — Gray Fabric Armchair
const grayArmchair = await prisma.product.create({
  data: {
    name: "Fabric Armchair",
    slug: "fabric-armchair",
    description:
      "A modern fabric armchair featuring a softly contoured seat, angled armrests, and slim wooden legs. Designed for comfort and everyday use, it fits naturally into contemporary and Scandinavian-style interiors.",
    modelUrl: "models/fabric-armchair.glb",
    thumbnailUrl: "/thumbnails/fabric-armchair.webp",
    baseColor: "#8A8A8A",
    isFeatured: false,
    widthCm: 72,
    heightCm: 78,
    depthCm: 74,
    weightKg: 14,
    material: "Fabric upholstery, wooden legs",
    maxLoadKg: 120,
    categoryId: armchairsCategory.id,
  },
});

await prisma.variant.createMany({
  data: [
    {
      name: "Gray",
      colorHex: "#8A8A8A",
      isDefault: true,
      productId: grayArmchair.id,
    },
    {
      name: "Blue Gray",
      colorHex: "#7393B3",
      isDefault: false,
      productId: grayArmchair.id,
    },
  ],
});

// Product 8 — Wooden Coffee Table
const woodenCoffeeTable = await prisma.product.create({
  data: {
    name: "Wooden Coffee Table",
    slug: "wooden-coffee-table",
    description:
      "A modern coffee table featuring a light wood tabletop with a geometric profile and a solid black metal base. Its clean, minimalist design fits contemporary interiors and works well as a central living-room surface.",
    modelUrl: "models/classic-table.glb",
    thumbnailUrl: "/thumbnails/classic-table.webp",
    baseColor: "#C9A574",
    isFeatured: false,
    widthCm: 120,
    heightCm: 42,
    depthCm: 60,
    weightKg: 22,
    material: "Wood tabletop, metal base",
    maxLoadKg: 60,
    categoryId: tablesCategory.id,
  },
});

// Variants — Product 8
await prisma.variant.createMany({
  data: [
    {
      name: "Light Oak",
      colorHex: "#C9A574",
      isDefault: true,
      productId: woodenCoffeeTable.id,
    },
    {
      name: "Walnut",
      colorHex: "#8B5E3C",
      isDefault: false,
      productId: woodenCoffeeTable.id,
    },
  ],
});

  // Product 9 — Musa (Raw Musa Series) — Birgit Piskor
const musaSculpture = await prisma.product.create({
  data: {
    name: "Piskor Sculpture",
    slug: "piskor-sculpture",
    description:
      "Piskor is a sculpture by Birgit Piskor from the Raw Musa Series. A tall, abstract standing form designed as a statement piece for modern interiors.",
    modelUrl: "models/piskor-sculpture.glb",
    thumbnailUrl: "/thumbnails/piskor-sculpture.webp",
    baseColor: "#252525",
    isFeatured: true,
    widthCm: 53.34,
    heightCm: 205.74,
    depthCm: 12.7,
    weightKg: 35, 
    material: "Sculpture (series: Raw Musa)",
    categoryId: sculpturesCategory.id,
  },
});

// Variants — Product 9
await prisma.variant.createMany({
  data: [
    {
      name: "White",
      colorHex: "#FFFFFF",
      isDefault: false,
      productId: musaSculpture.id,
    },
    {
      name: "Jet Black",
      colorHex: "#252525",
      isDefault: true,
      productId: musaSculpture.id,
    },
  ],
});

// Product 10 — Coffee Table Jais
const coffeeTableJais = await prisma.product.create({
  data: {
    name: "Coffee Table Jais",
    slug: "coffee-table-jais",
    description:
      "Crafted with meticulous attention to detail, the Jais coffee table is designed to complement and contrast with its surroundings. A modern composition of metal, brass accents, wood, and marble-like stone surfaces, balancing strength, warmth, and elegance.",
    modelUrl: "models/jais-table.glb",
    thumbnailUrl: "/thumbnails/jais-table.webp",
    useOriginalColor: true,
    isFeatured: true,
    widthCm: 130,
    depthCm: 68.5,
    heightCm: 20,
    weightKg: 28,
    material: "Metal, stone, wood, brass accents",
    categoryId: tablesCategory.id,
  },
});

// Product 11 — Xander Desk
const xanderDesk = await prisma.product.create({
  data: {
    name: "Xander Desk",
    slug: "xander-desk",
    description:
      "With its commanding presence and sculptural lines, Xander is more than a desk — it’s the centerpiece of a creative workspace. Crafted with fine oak veneer and designed to balance elegance and function, its fluid silhouette provides ample surface area for focused work and collaborative moments.",
    modelUrl: "models/xander-desk.glb",
    thumbnailUrl: "/thumbnails/xander-desk.webp",
    //baseColor: "#6B442A",
    useOriginalColor: true,
    originalColorName: "American Walnut",
    originalColorPreview: "#6B442A",
    isFeatured: true,
    widthCm: 217,
    depthCm: 180,
    heightCm: 82,
    weightKg: 55,
    material: "Oak veneer (stained finish)",
    categoryId: desksCategory.id,
  },
});

await prisma.variant.createMany({
  data: [
    {
      name: "Dark Walnut",
      colorHex: "#3A2619",
      isDefault: false,
      productId: xanderDesk.id,
    }
  ],
});

  // Summary
  const productCount = await prisma.product.count();
  const variantCount = await prisma.variant.count();
  const categoryCount = await prisma.category.count();

  console.log('✅ Seeding complete!');
  console.log(`   📁 ${categoryCount} categories`);
  console.log(`   🪑 ${productCount} products`);
  console.log(`   🎨 ${variantCount} variants`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
