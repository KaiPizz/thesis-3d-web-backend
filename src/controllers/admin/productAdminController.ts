import { Request, Response } from 'express';
import {
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  getAllProductsWithAllVariants,
} from '../../services/productService';

const REQUIRED_PRODUCT_FIELDS = [
  'name',
  'slug',
  'description',
  'categoryId',
  'modelUrl',
  'thumbnailUrl',
  'baseColor',
] as const;

/**
 * GET /api/admin/products
 * Get all products with all variants (for admin panel)
 */
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await getAllProductsWithAllVariants();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function createProduct(req: Request, res: Response) {
  try {
    const body = req.body;

    // Basic validation
    const missingFields = REQUIRED_PRODUCT_FIELDS.filter(
      (field) => !body[field]
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    const product = await createProductService({
      name: body.name,
      slug: body.slug,
      description: body.description,
      categoryId: body.categoryId,
      modelUrl: body.modelUrl,
      thumbnailUrl: body.thumbnailUrl,
      baseColor: body.baseColor,
      isFeatured: body.isFeatured,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);

    // Handle unique constraint violation (slug)
    if ((error as any)?.code === 'P2002') {
      res.status(400).json({ error: 'Product with this slug already exists' });
      return;
    }

    // Handle foreign key constraint (categoryId)
    if ((error as any)?.code === 'P2003') {
      res.status(400).json({ error: 'Invalid categoryId' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * PUT /api/admin/products/:id
 * Update an existing product
 */
export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body;

    // Check if body has at least one field to update
    if (Object.keys(body).length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    const product = await updateProductService(id, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      categoryId: body.categoryId,
      modelUrl: body.modelUrl,
      thumbnailUrl: body.thumbnailUrl,
      baseColor: body.baseColor,
      isFeatured: body.isFeatured,
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);

    // Handle not found
    if ((error as any)?.code === 'P2025') {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Handle unique constraint violation (slug)
    if ((error as any)?.code === 'P2002') {
      res.status(400).json({ error: 'Product with this slug already exists' });
      return;
    }

    // Handle foreign key constraint (categoryId)
    if ((error as any)?.code === 'P2003') {
      res.status(400).json({ error: 'Invalid categoryId' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * DELETE /api/admin/products/:id
 * Delete a product and its variants
 */
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await deleteProductService(id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);

    // Handle not found
    if ((error as any)?.code === 'P2025') {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

