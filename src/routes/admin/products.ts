import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/admin/productAdminController';

const router = Router();

// POST /api/admin/products - Create a new product
router.post('/', createProduct);

// PUT /api/admin/products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /api/admin/products/:id - Delete a product
router.delete('/:id', deleteProduct);

export default router;

