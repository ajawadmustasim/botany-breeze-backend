import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Botanist } from "../models/botanist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserDP } from "./user.controller.js";

// Additional functionalities for botanists
const updateBotanistVerificationStatus = asyncHandler(async (req, res) => {
    const { botanistId, verificationStatus } = req.body;

    if (typeof verificationStatus !== "boolean") {
        throw new ApiError(400, "Verification status must be a boolean value");
    }

    const botanist = await Botanist.findByIdAndUpdate(
        botanistId,
        { verificationStatus },
        { new: true }
    );

    if (!botanist) {
        throw new ApiError(404, "Botanist not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, botanist, "Botanist verification status updated successfully"));
});

const updateBotanistRating = asyncHandler(async (req, res) => {
    const { botanistId, rating } = req.body;

    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        throw new ApiError(400, "Rating must be a number between 0 and 5");
    }

    const botanist = await Botanist.findByIdAndUpdate(
        botanistId,
        { rating },
        { new: true }
    );

    if (!botanist) {
        throw new ApiError(404, "Botanist not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, botanist, "Botanist rating updated successfully"));
});

const registerBotanist = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, phone, qualification } = req.body;

    if (
        [fullName, email, username, password, phone, qualification].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        qualification,
        username: username.toLowerCase(),
        userType: "botanist"
    });

    const botanist = await Botanist.create({
        qualification,
        userDetails: user._id
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the botanist");
    }

    return res.status(201).json(
        new ApiResponse(200, { user: createdUser, botanist }, "Botanist registered successfully")
    );
});

const getBotanistDetails = asyncHandler(async (req, res) => {
    // Use req.user._id to find the botanist associated with the authenticated user
    const botanist = await Botanist.findOne({ userDetails: req.user._id }).populate({
        path: 'userDetails',
        select: '-password -refreshToken'
    });

    if (!botanist) {
        throw new ApiError(404, "Botanist not found");
    }

    return res.status(200).json(new ApiResponse(200, botanist, "Botanist details fetched successfully"));
});

// Export all functionalities
export {
    registerBotanist,
    getBotanistDetails,
    updateBotanistVerificationStatus,
    updateBotanistRating,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserDP
};