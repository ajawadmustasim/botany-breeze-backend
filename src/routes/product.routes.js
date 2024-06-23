import { Router } from 'express';

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createProduct).get(getAllProducts);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default router;
