import prisma from '../lib/prisma';

// ===========================================
// Public API functions
// ===========================================

/**
 * Get all products with only their default variant included
 */
export async function getAllProductsWithDefaultVariant() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        where: {
          isDefault: true,
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform to include defaultVariant as single object instead of array
  return products.map((product) => {
    const { variants, ...rest } = product;
    return {
      ...rest,
      defaultVariant: variants[0] || null,
    };
  });
}

/**
 * Get a single product by ID with all its variants
 */
export async function getProductWithVariants(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      variants: {
        orderBy: {
          isDefault: 'desc', // Default variant first
        },
      },
    },
  });

  return product;
}

// ===========================================
// Admin API functions
// ===========================================

export interface CreateProductData {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  modelUrl: string;
  thumbnailUrl: string;
  baseColor: string;
  isFeatured?: boolean;
}

export interface UpdateProductData {
  name?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  modelUrl?: string;
  thumbnailUrl?: string;
  baseColor?: string;
  isFeatured?: boolean;
}

/**
 * Create a new product
 */
export async function createProduct(data: CreateProductData) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      categoryId: data.categoryId,
      modelUrl: data.modelUrl,
      thumbnailUrl: data.thumbnailUrl,
      baseColor: data.baseColor,
      isFeatured: data.isFeatured ?? false,
    },
    include: {
      category: true,
      variants: true,
    },
  });

  return product;
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, data: UpdateProductData) {
  const product = await prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
      variants: true,
    },
  });

  return product;
}

/**
 * Delete a product and all its variants (cascade via schema)
 */
export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
  });

  return product;
}
