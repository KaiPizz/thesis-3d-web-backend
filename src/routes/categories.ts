import { Router } from 'express';
import { getCategories } from '../controllers/categoryController';

const router = Router();

// GET /api/categories - List all categories with minimal product data
router.get('/', getCategories);

export default router;

