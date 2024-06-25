import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Discussion } from "../models/discussion.model.js";
import { DiscussionReply } from "../models/discussionReply.model.js";

// Create a new discussion
const createDiscussion = asyncHandler(async (req, res) => {
    const { question } = req.body;

    // Ensure the user is authenticated
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const newDiscussion = new Discussion({
            question,
            createdBy: req.user._id,
        });

        await newDiscussion.save();

        res.status(201).json(
            new ApiResponse(200, newDiscussion, "Question posted successfully")
        );
    } catch (error) {
        throw new ApiError(400, "Unable to post question");
    }
});

// Get all discussions
const getDiscussions = asyncHandler(async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('createdBy', 'fullName username') // Include only necessary fields from the user
            .populate({
                path: 'replies',
                populate: { path: 'replyBy', select: 'fullName username' } // Include only necessary fields from the replier
            })
            .select('question createdBy replies'); // Ensure question, createdBy, and replies are included

        res.status(200).json(
            new ApiResponse(200, discussions, "Discussions fetched successfully")
        );
    } catch (error) {
        throw new ApiError(404, "Unable to fetch discussions");
    }
});

// Get all discussions of the current user
const getUserDiscussions = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const discussions = await Discussion.find({ createdBy: userId })
            .populate('createdBy', '-password -refreshToken')
            .populate({
                path: 'replies',
                populate: { path: 'replyBy', select: '-password -refreshToken' }
            });

        if (!discussions) {
            throw new ApiError(404, 'No discussions found for the current user');
        }

        res.status(200).json(
            new ApiResponse(200, discussions, 'Discussions fetched successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Unable to fetch discussions');
    }
});

// Get a single discussion by ID
const getDiscussionById = async (req, res) => {
    const { id } = req.params;

    try {
        const discussion = await Discussion.findById(id).populate('createdBy').populate({
            path: 'replays',
            populate: { path: 'replyBy' }
        });
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        res.status(200).json(
            new ApiResponse(200, discussion, "Discussion fetched from id Successfully")
        );
    } catch (error) {
        throw new ApiError(404, "Unable to fetch discussion by id");
    }
};

// Update a discussion by ID
const updateDiscussion = async (req, res) => {
    const { id } = req.params;
    const { question } = req.body;

    try {
        const updatedDiscussion = await Discussion.findByIdAndUpdate(
            id,
            { question },
            { new: true }
        ).populate('createdBy').populate({
            path: 'replays',
            populate: { path: 'replyBy' }
        });

        if (!updatedDiscussion) return res.status(404).json({ message: 'Discussion not found' });

        res.status(200).json(
            new ApiResponse(200, updatedDiscussion, "Discussion updated Successfully")
    );
    } catch (error) {
        throw new ApiError(400, "Unable to update discussion");
    }
};

// Delete a discussion by ID
const deleteDiscussion = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDiscussion = await Discussion.findByIdAndDelete(id);

        if (!deletedDiscussion) return res.status(404).json({ message: 'Discussion not found' });

        // Optionally, delete all associated replies
        await DiscussionReply.deleteMany({ questionDetails: id });

        res.status(200).json(
            new ApiResponse(200, deletedDiscussion, "Discussion deleted Successfully")
    );
    } catch (error) {
        throw new ApiError(400, "Unable to delete discussion");
    }
};

export {
    createDiscussion,
    getDiscussions,
    getUserDiscussions,
    getDiscussionById,
    updateDiscussion,
    deleteDiscussion
}