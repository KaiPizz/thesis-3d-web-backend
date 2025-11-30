import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const router = Router();

// GET /api/products - List all products with default variant
router.get('/', getProducts);

// GET /api/products/:id - Get single product with all variants
router.get('/:id', getProductById);

export default router;

