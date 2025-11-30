import { Router } from 'express';
import productsRouter from './products';
import categoriesRouter from './categories';
import adminProductsRouter from './admin/products';
import adminVariantsRouter from './admin/variants';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Public API routes
router.use('/api/products', productsRouter);
router.use('/api/categories', categoriesRouter);

// Admin API routes
router.use('/api/admin/products', adminProductsRouter);
router.use('/api/admin/variants', adminVariantsRouter);

export default router;
