import mongoose from "mongoose"

const discussionSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
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