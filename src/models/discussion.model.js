import mongoose from "mongoose"

const discussionSchema = new mongoose.Schema(
    {
        question: {
            type: String
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        replays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DiscussionReply',
        },
        ], // Array of replays
    }, {timestamps:true}
); 

export const Discussion = mongoose.model("Discussion", discussionSchema)