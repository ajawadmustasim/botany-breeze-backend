import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Nursery } from "../models/nursery.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserDP } from "./user.controller.js";
import { Gardener } from "../models/gardener.model.js";

// Additional functionalities for nursery admin
const registerNursery = asyncHandler(async (req, res) => {
    const { nurseryDetails, nurseryAddress, nurseryCity, nurseryContact, id, nurseryAdmin } = req.body;

    if ([nurseryDetails, nurseryAddress, nurseryContact, id, nurseryAdmin].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedNursery = await Nursery.findOne({ id });

    if (existedNursery) {
        throw new ApiError(409, "Nursery with this ID already exists");
    }

    const nursery = await Nursery.create({
        nurseryDetails,
        nurseryAddress,
        nurseryCity,
        nurseryContact,
        id,
        nurseryAdmin
    });

    return res.status(201).json(new ApiResponse(200, nursery, "Nursery registered successfully"));
});

const getNurseryDetails = asyncHandler(async (req, res) => {
    const nursery = await Nursery.findById(req.params.id)
        .populate("nurseryAdmin", "-password -refreshToken")
        .populate("productList")
        .populate("gardenerList");

    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    return res.status(200).json(new ApiResponse(200, nursery, "Nursery details fetched successfully"));
});

const updateNurseryDetails = asyncHandler(async (req, res) => {
    const { nurseryDetails, nurseryAddress, nurseryCity, nurseryContact } = req.body;

    if ([nurseryDetails, nurseryAddress, nurseryContact].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Nursery details, address, and contact are required");
    }

    const nursery = await Nursery.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                nurseryDetails,
                nurseryAddress,
                nurseryCity,
                nurseryContact
            }
        },
        { new: true }
    );

    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    return res.status(200).json(new ApiResponse(200, nursery, "Nursery details updated successfully"));
});

const addProductToNursery = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const nursery = await Nursery.findById(req.params.id);

    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    nursery.productList.push(productId);
    await nursery.save();

    return res.status(200).json(new ApiResponse(200, nursery, "Product added to nursery successfully"));
});

const addGardenerToNursery = asyncHandler(async (req, res) => {
    const { gardenerId } = req.body;
    const nursery = await Nursery.findById(req.params.id);

    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    nursery.gardenerList.push(gardenerId);
    await nursery.save();

    return res.status(200).json(new ApiResponse(200, nursery, "Gardener added to nursery successfully"));
});

// Export all functionalities
export {
    registerNursery,
    getNurseryDetails,
    updateNurseryDetails,
    addProductToNursery,
    addGardenerToNursery,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserDP,
    addGardener
};
