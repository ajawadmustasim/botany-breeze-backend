import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GardenerRating } from "../models/gardenerRating.model.js";
import { Gardener } from "../models/gardener.model.js";
import { User } from "../models/user.model.js";

// Function for a user to give rating to a gardener
const giveFeedback = asyncHandler(async (req, res) => {
    const { gardenerID, rating } = req.body;
    const custID = req.user._id;

    if (!gardenerID || !rating) {
        throw new ApiError(400, "Gardener ID and rating are required");
    }

    // Ensure the gardener exists
    const gardener = await Gardener.findById(gardenerID);
    if (!gardener) {
        throw new ApiError(404, "Gardener not found");
    }

    // Ensure the user giving rating exists
    const user = await User.findById(custID);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Create rating
    const rating = await Rating.create({
        gardenerID,
        rating,
        custID
    });

    // Optionally update the gardener's rating (e.g., average rating)
    // Calculate the new average rating for the gardener
    const ratings = await Rating.find({ gardenerID });
    const avgRating = rating.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
    gardener.rating = avgRating;
    await gardener.save();

    return res.status(201).json(new ApiResponse(200, rating, "Gardener rating submitted successfully"));
});

export { giveGardenerRating };