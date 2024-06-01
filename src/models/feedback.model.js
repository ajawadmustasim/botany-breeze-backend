import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
    {
        botanistID: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
        },
        custID: {
            type: Number,
            unique: true
        }
    }, {timestamps:true}
) 

export const feedback = mongoose.model("Feedback", feedbackSchema)