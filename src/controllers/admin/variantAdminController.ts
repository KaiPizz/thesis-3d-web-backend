import { Request, Response } from 'express';
import {
  createVariant as createVariantService,
  updateVariant as updateVariantService,
  deleteVariant as deleteVariantService,
} from '../../services/variantService';

const REQUIRED_VARIANT_FIELDS = ['name', 'colorHex'] as const;

/**
 * POST /api/admin/variants/:productId
 * Create a new variant for a product
 */
export async function createVariant(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const body = req.body;

    // Basic validation
    const missingFields = REQUIRED_VARIANT_FIELDS.filter(
      (field) => !body[field]
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    const variant = await createVariantService(productId, {
      name: body.name,
      colorHex: body.colorHex,
      textureUrl: body.textureUrl,
      isDefault: body.isDefault,
    });

    res.status(201).json(variant);
  } catch (error) {
    console.error('Error creating variant:', error);

    // Handle foreign key constraint (productId)
    if ((error as any)?.code === 'P2003') {
      res.status(400).json({ error: 'Invalid productId' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * PUT /api/admin/variants/:id
 * Update an existing variant
 */
export async function updateVariant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body;

    // Check if body has at least one field to update
    if (Object.keys(body).length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    const variant = await updateVariantService(id, {
      name: body.name,
      colorHex: body.colorHex,
      textureUrl: body.textureUrl,
      isDefault: body.isDefault,
    });

    res.json(variant);
  } catch (error) {
    console.error('Error updating variant:', error);

    // Handle not found
    if ((error as any)?.code === 'P2025') {
      res.status(404).json({ error: 'Variant not found' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * DELETE /api/admin/variants/:id
 * Delete a variant
 */
export async function deleteVariant(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await deleteVariantService(id);

    res.json({ message: 'Variant deleted successfully' });
  } catch (error) {
    console.error('Error deleting variant:', error);

    // Handle not found
    if ((error as any)?.code === 'P2025') {
      res.status(404).json({ error: 'Variant not found' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

