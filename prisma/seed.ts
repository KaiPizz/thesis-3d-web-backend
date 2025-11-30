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

  // Create products with variants
  // Order on homepage is createdAt DESC, so we set explicit timestamps:
  // - diningChair: newest (appears first)
  // - officeChair: second
  // - velvetArmchair: third
  // - loungeArmchair: oldest (appears last)
  console.log('Creating products and variants...');

  const now = new Date();

  // Product 1: Modern Dining Chair (newest - appears first)
  const diningChair = await prisma.product.create({
    data: {
      name: 'Modern Dining Chair',
      slug: 'modern-dining-chair',
      description:
        'Elegant dining chair with clean lines and comfortable seating. Perfect for contemporary dining rooms.',
      categoryId: chairsCategory.id,
      modelUrl: '/models/dining-chair.glb',
      thumbnailUrl: '/thumbnails/dining-chair.webp',
      baseColor: '#8B4513',
      isFeatured: true,
      createdAt: new Date(now.getTime()),
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: diningChair.id,
        name: 'Natural Oak',
        colorHex: '#D4A574',
        isDefault: true,
      },
      {
        productId: diningChair.id,
        name: 'Walnut Brown',
        colorHex: '#5C4033',
        isDefault: false,
      },
      {
        productId: diningChair.id,
        name: 'Charcoal Black',
        colorHex: '#2C2C2C',
        isDefault: false,
      },
    ],
  });

  // Product 2: Ergonomic Office Chair (second)
  const officeChair = await prisma.product.create({
    data: {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description:
        'Professional ergonomic chair with lumbar support and adjustable armrests. Designed for long work sessions.',
      categoryId: chairsCategory.id,
      modelUrl: '/models/office-chair.glb',
      thumbnailUrl: '/thumbnails/office-chair.webp',
      baseColor: '#1A1A1A',
      isFeatured: true,
      createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: officeChair.id,
        name: 'Midnight Black',
        colorHex: '#1A1A1A',
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

  // Product 3: Classic Velvet Armchair (third)
  const velvetArmchair = await prisma.product.create({
    data: {
      name: 'Classic Velvet Armchair',
      slug: 'classic-velvet-armchair',
      description:
        'Luxurious velvet armchair with deep cushioning and elegant curved arms. A statement piece for any living room.',
      categoryId: armchairsCategory.id,
      modelUrl: '/models/velvet-armchair.glb',
      thumbnailUrl: '/thumbnails/velvet-armchair.webp',
      baseColor: '#2D5A4A',
      isFeatured: true,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: velvetArmchair.id,
        name: 'Emerald Green',
        colorHex: '#2D5A4A',
        isDefault: true,
      },
      {
        productId: velvetArmchair.id,
        name: 'Royal Blue',
        colorHex: '#1E3A5F',
        isDefault: false,
      },
      {
        productId: velvetArmchair.id,
        name: 'Burgundy Red',
        colorHex: '#722F37',
        isDefault: false,
      },
    ],
  });

  // Product 4: Scandinavian Lounge Armchair (oldest - appears last)
  const loungeArmchair = await prisma.product.create({
    data: {
      name: 'Scandinavian Lounge Armchair',
      slug: 'scandinavian-lounge-armchair',
      description:
        'Minimalist Scandinavian design with natural wood frame and premium fabric upholstery. Timeless comfort meets modern aesthetics.',
      categoryId: armchairsCategory.id,
      modelUrl: '/models/lounge-armchair.glb',
      thumbnailUrl: '/thumbnails/lounge-armchair.webp',
      baseColor: '#E8DCC4',
      isFeatured: true,
      createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: loungeArmchair.id,
        name: 'Cream White',
        colorHex: '#E8DCC4',
        isDefault: true,
      },
      {
        productId: loungeArmchair.id,
        name: 'Light Gray',
        colorHex: '#B8B8B8',
        isDefault: false,
      },
      {
        productId: loungeArmchair.id,
        name: 'Soft Pink',
        colorHex: '#E8C4C4',
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
