import { Router } from 'express';
import {
  createVariant,
  updateVariant,
  deleteVariant,
} from '../../controllers/admin/variantAdminController';

const router = Router();

// POST /api/admin/variants/:productId - Create a variant for a product
router.post('/:productId', createVariant);

// PUT /api/admin/variants/:id - Update a variant
router.put('/:id', updateVariant);

// DELETE /api/admin/variants/:id - Delete a variant
router.delete('/:id', deleteVariant);

export default router;

