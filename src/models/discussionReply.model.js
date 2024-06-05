import mongoose from "mongoose"

const discussionReplySchema = new mongoose.Schema(
    {
      reply: {
        type: String,
        required: true,
      },
      replyBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      questionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
      },
    },
    { timestamps: true }
  );
  
  export const DiscussionReply = mongoose.model('DiscussionReply', discussionReplySchema);