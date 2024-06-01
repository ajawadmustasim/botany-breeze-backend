import mongoose from "mongoose"

const quizSchema = new mongoose.Schema(
    {
        quizID: {
            type: Number,
            required: true,
            unique: true
        },
        quizStatus:
        {
            type: Boolean,
            default: fail,
            emum: ["pass", "fail"]
        },
        marks:
        {
            type: Number,
        }
    }, {timestamps:true}
) 

export const Quiz = mongoose.model("Quiz", quizSchema)