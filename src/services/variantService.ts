import prisma from '../lib/prisma';

export interface CreateVariantData {
  name: string;
  colorHex: string;
  textureUrl?: string | null;
  isDefault?: boolean;
}

export interface UpdateVariantData {
  name?: string;
  colorHex?: string;
  textureUrl?: string | null;
  isDefault?: boolean;
}

/**
 * Create a new variant for a product
 * If isDefault is true, sets all other variants for this product to isDefault = false
 */
export async function createVariant(productId: string, data: CreateVariantData) {
  // If this variant should be default, unset other defaults first
  if (data.isDefault) {
    await prisma.variant.updateMany({
      where: { productId },
      data: { isDefault: false },
    });
  }

  const variant = await prisma.variant.create({
    data: {
      productId,
      name: data.name,
      colorHex: data.colorHex,
      textureUrl: data.textureUrl ?? null,
      isDefault: data.isDefault ?? false,
    },
    include: {
      product: true,
    },
  });

  return variant;
}

/**
 * Update an existing variant
 * If isDefault is true, sets all other variants for the same product to isDefault = false
 */
export async function updateVariant(id: string, data: UpdateVariantData) {
  // If setting this variant as default, unset other defaults first
  if (data.isDefault) {
    // Get the variant to find its productId
    const existingVariant = await prisma.variant.findUnique({
      where: { id },
      select: { productId: true },
    });

    if (existingVariant) {
      await prisma.variant.updateMany({
        where: {
          productId: existingVariant.productId,
          id: { not: id },
        },
        data: { isDefault: false },
      });
    }
  }

  const variant = await prisma.variant.update({
    where: { id },
    data,
    include: {
      product: true,
    },
  });

  return variant;
}

/**
 * Delete a variant
 */
export async function deleteVariant(id: string) {
  const variant = await prisma.variant.delete({
    where: { id },
  });

  return variant;
}

