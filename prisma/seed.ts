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

  console.log('Creating products and variants...');

  const now = new Date();

  // Product 1: Modern Dining Chair
  const diningChair = await prisma.product.create({
    data: {
      name: 'Wooden Dining Chair',
      slug: 'wooden-dining-chair',
      description:
        'A handcrafted wooden dining chair featuring traditional carved details, spindle legs, and a warm natural finish.',
      categoryId: chairsCategory.id,
      modelUrl: '/models/dining-chair.glb',
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
      {
        productId: diningChair.id,
        name: 'Charred Ash',
        colorHex: '#2C2A28',
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
      modelUrl: '/models/office-chair.glb',
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
      {
        productId: officeChair.id,
        name: 'Arctic White',
        colorHex: '#E6E8EB',
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
      modelUrl: '/models/velvet-armchair.glb',
      thumbnailUrl: '/thumbnails/velvet-armchair.webp',
      baseColor: '#6E7745',
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
        name: 'Charcoal Velvet',
        colorHex: '#2B2D30',
        isDefault: false,
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
      modelUrl: '/models/lounge-armchair.glb',
      thumbnailUrl: '/thumbnails/lounge-armchair.webp',
      baseColor: '#315fb5',
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
        isDefault: true,
      },
      {
        productId: loungeArmchair.id,
        name: 'Rustic Copper',
        colorHex: '#a15012',
        isDefault: false,
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
      modelUrl: '/models/big-dog-lamp.glb',        
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

  await prisma.variant.createMany({
    data: [
      {
        productId: bigDogLamp.id,
        name: 'Black',                  
        colorHex: '#000000',                   
        isDefault: true,                       
      },
    ],
  });
    
  // Product 6: Small Dog Lamp
  const smallDogLamp = await prisma.product.create({
    data: {
      name: 'Small Dog Lamp',                   
      slug: 'small-dog-lamp',                   
      description: 'A quirky black dog-shaped table lamp featuring a matte sculpture-style body, a black fabric lampshade, and a playful poop-shaped power switch.',
      categoryId: lampCategory.id,           
      modelUrl: '/models/small-dog-lamp.glb',        
      thumbnailUrl: '/thumbnails/small-dog-lamp.webp',
      baseColor: '#000000',                  
      isFeatured: true,                       
      createdAt: new Date(now.getTime()),
      // Specifications
      widthCm: 18,
      heightCm: 42,
      depthCm: 22,
      weightKg: 1.8,
      material: 'Resin body, fabric lampshade',
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: smallDogLamp.id,
        name: 'Black',                  
        colorHex: '#000000',                   
        isDefault: false,                       
      },
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
