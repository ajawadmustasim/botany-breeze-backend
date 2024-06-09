import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { nurseryRating } from "../models/nurseryRating.model.js";
import { Nursery } from "../models/nursery.model.js";
import { User } from "../models/user.model.js";

// Function for a user to give rating to a nursery
const giveFeedback = asyncHandler(async (req, res) => {
    const { nurseryID, rating } = req.body;
    const custID = req.user._id;

    if (!nurseryID || !rating) {
        throw new ApiError(400, "Nusery ID and rating are required");
    }

    // Ensure the nursery exists
    const nursery = await Nursery.findById(nurseryID);
    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    // Ensure the user giving rating exists
    const user = await User.findById(custID);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Create rating
    const rating = await Rating.create({
        nurseryID,
        rating,
        custID
    });

    // Optionally update the nursery's rating (e.g., average rating)
    // Calculate the new average rating for the nursery
    const ratings = await Rating.find({ nurseryID });
    const avgRating = rating.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
    nursery.rating = avgRating;
    await nursery.save();

    return res.status(201).json(new ApiResponse(200, rating, "Nursery rating submitted successfully"));
});

export { givenNrseryRating };