import { Request, Response } from 'express';
import { getAllCategoriesWithProducts } from '../services/categoryService';

/**
 * GET /api/categories
 * Returns all categories with minimal product data
 */
export async function getCategories(_req: Request, res: Response) {
  try {
    const categories = await getAllCategoriesWithProducts();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

