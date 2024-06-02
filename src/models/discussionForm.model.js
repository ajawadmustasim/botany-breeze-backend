import mongoose from "mongoose"

const discussionSchema = new mongoose.Schema(
    {
        question: {
            type: String
        },
        answer: [
            {
                type: String
            }
        ]
    }, {timestamps:true}
) 

export const Discussion = mongoose.model("Discussion", discussionSchema)