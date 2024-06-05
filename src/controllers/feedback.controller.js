import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feedback } from "../models/feedback.model.js";
import { Botanist } from "../models/botanist.model.js";
import { User } from "../models/user.model.js";

// Function for a user to give feedback/rating to a botanist
const giveFeedback = asyncHandler(async (req, res) => {
    const { botanistID, rating } = req.body;
    const custID = req.user._id;

    if (!botanistID || !rating) {
        throw new ApiError(400, "Botanist ID and rating are required");
    }

    // Ensure the botanist exists
    const botanist = await Botanist.findById(botanistID);
    if (!botanist) {
        throw new ApiError(404, "Botanist not found");
    }

    // Ensure the user giving feedback exists
    const user = await User.findById(custID);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Create feedback
    const feedback = await Feedback.create({
        botanistID,
        rating,
        custID
    });

    // Optionally update the botanist's rating (e.g., average rating)
    // Calculate the new average rating for the botanist
    const feedbacks = await Feedback.find({ botanistID });
    const avgRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
    botanist.rating = avgRating;
    await botanist.save();

    return res.status(201).json(new ApiResponse(200, feedback, "Feedback submitted successfully"));
});

export { giveFeedback };
