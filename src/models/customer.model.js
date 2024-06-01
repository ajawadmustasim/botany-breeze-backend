import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        feedback: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Feedback"
            }
        ],
        userDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }, {timestamps:true}
); 

export const Customer = mongoose.model("Customer", customerSchema);