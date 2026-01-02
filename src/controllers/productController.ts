import { Request, Response } from 'express';
import {
  getAllProductsWithDefaultVariant,
  getProductWithVariants,
} from '../services/productService';

/**
 * Transform flat spec fields into a nested specs object
 */
function transformProductWithSpecs<T extends {
  widthCm?: number | null;
  heightCm?: number | null;
  depthCm?: number | null;
  weightKg?: number | null;
  material?: string | null;
  maxLoadKg?: number | null;
}>(product: T) {
  const { widthCm, heightCm, depthCm, weightKg, material, maxLoadKg, ...rest } = product;
  
  const specs: Record<string, number | string> = {};
  if (widthCm != null) specs.widthCm = widthCm;
  if (heightCm != null) specs.heightCm = heightCm;
  if (depthCm != null) specs.depthCm = depthCm;
  if (weightKg != null) specs.weightKg = weightKg;
  if (material != null) specs.material = material;
  if (maxLoadKg != null) specs.maxLoadKg = maxLoadKg;

  return {
    ...rest,
    specs: Object.keys(specs).length > 0 ? specs : undefined,
  };
}

/**
 * GET /api/products
 * Returns all products with their default variant
 */
export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await getAllProductsWithDefaultVariant();
    const transformed = products.map(transformProductWithSpecs);
    res.json(transformed);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /api/products/:id
 * Returns a single product with all variants
 */
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await getProductWithVariants(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(transformProductWithSpecs(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

