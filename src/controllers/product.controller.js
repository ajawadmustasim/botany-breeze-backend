import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import {uploadProduct} from "../middlewares/multerProduct.middleware.js";


// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const userId = req.user._id; // Assuming req.user contains the logged-in user's info

    // Check if the user is logged in
    if (!userId) {
        throw new ApiError(401, "User not logged in");
    }

        try {
            // Create the new product
            const newProduct = new Product({
                name,
                description,
                price,
                category,
                owner: userId
            });

            await newProduct.save();

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError(404, "User not found");
            }

            // Initialize the products array if it doesn't exist
            if (!user.products) {
                user.products = [];
            }

            // Add the new product to the user's products array
            user.products.push(newProduct._id);

            // Save the updated user
            await user.save();

            res.status(201).json(
                new ApiResponse(201, newProduct, 'Product created and added to user successfully')
            );
        } catch (error) {
            throw new ApiError(500, "Unable to create product");
        }
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
