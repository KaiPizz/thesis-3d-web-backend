import { Request, Response } from 'express';
import {
  getAllProductsWithDefaultVariant,
  getProductWithVariants,
} from '../services/productService';

/**
 * GET /api/products
 * Returns all products with their default variant
 */
export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await getAllProductsWithDefaultVariant();
    res.json(products);
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

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

