import prisma from '../lib/prisma';

/**
 * Get all categories with minimal product data
 */
export async function getAllCategoriesWithProducts() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
          slug: true,
          thumbnailUrl: true,
          isFeatured: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}

