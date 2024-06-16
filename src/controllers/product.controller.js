import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, id, description, price, category, picture } = req.body;

    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
        throw new ApiError(409, 'Product with this ID already exists');
    }

    const newProduct = new Product({
        name,
        id,
        description,
        price,
        category,
        picture
    });

    await newProduct.save();

    res.status(201).json(new ApiResponse(201, newProduct, 'Product created successfully'));
});

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully'));
});

// Get a product by ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(200, product, 'Product fetched successfully'));
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, picture } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.picture = picture || product.picture;

    await product.save();

    res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'));
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    await product.remove();

    res.status(200).json(new ApiResponse(200, {}, 'Product deleted successfully'));
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
