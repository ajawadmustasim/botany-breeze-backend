import DiscussionReply from "../models/discussionReply.model.js";
import Discussion from "../models/discussion.model.js";

// Create a new reply
const createReply = async (req, res) => {
    const { reply, replyBy, questionDetails } = req.body;

    try {
        const newReply = new DiscussionReply({
            reply,
            replyBy,
            questionDetails,
        });

        await newReply.save();

        // Add the reply to the corresponding discussion
        const discussion = await Discussion.findById(questionDetails);
        discussion.replays.push(newReply._id);
        await discussion.save();

        res.status(201).json(
            new ApiResponse(200, newReply, "Question replied Successfully")
        );
    } catch (error) {
        throw new ApiError(400, "Unable to reply question");
    }
};

// Get all replies
const getReplies = async (req, res) => {
    try {
        const replies = await DiscussionReply.find().populate('replyBy').populate('questionDetails');
        res.status(200).json(
            new ApiResponse(200, replies, "Replys fetched Successfully")
        );
    } catch (error) {
        throw new ApiError(404, "Unable to fetch replys");
    }
};

// Get a single reply by ID
const getReplyById = async (req, res) => {
    const { id } = req.params;

    try {
        const reply = await DiscussionReply.findById(id).populate('replyBy').populate('questionDetails');
        if (!reply) return res.status(404).json({ message: 'Reply not found' });

        res.status(200).json(new ApiResponse(200, reply, "Discussion reply fetched from id Successfully"));
    } catch (error) {
        throw new ApiError(404, "Unable to fetch discussion reply by id");
    }
};

// Update a reply by ID
const updateReply = async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;

    try {
        const updatedReply = await DiscussionReply.findByIdAndUpdate(
            id,
            { reply },
            { new: true }
        ).populate('replyBy').populate('questionDetails');

        if (!updatedReply) return res.status(404).json({ message: 'Reply not found' });

        res.status(200).json(
            new ApiResponse(200, updatedReply, "Reply updated Successfully")
    );
    } catch (error) {
        throw new ApiError(400, "Unable to update reply");
    }
};

// Delete a reply by ID
const deleteReply = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReply = await DiscussionReply.findByIdAndDelete(id);

        if (!deletedReply) return res.status(404).json({ message: 'Reply not found' });

        // Remove the reply from the corresponding discussion
        await Discussion.findByIdAndUpdate(deletedReply.questionDetails, {
            $pull: { replays: id }
        });

        res.status(200).json(
            new ApiResponse(200, deletedReply, "Reply deleted Successfully")
        );
    } catch (error) {
        throw new ApiError(400, "Unable to delete reply");
    }
};

export {
    createReply,
    getReplies,
    getReplyById,
    updateReply,
    deleteReply
}