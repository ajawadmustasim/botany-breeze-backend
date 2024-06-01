import mongoose from "mongoose";

const nurseryRatingSchema = new mongoose.Schema(
    {
        rating:{
            type: Number
        },
        userDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        nurseryDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nursery"
        },
    }, {timestamps:true}
);

export const NurseryRating = mongoose.model("NurseryRating", nurseryRatingSchema);