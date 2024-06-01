import mongoose from "mongoose";

const gardenerRatingSchema = new mongoose.Schema(
    {
        rating:{
            type: Number
        },
        userDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        gardenerDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gardener"
        },
    }, {timestamps:true}
);

export const GardenerRating = mongoose.model("GardenerRating", gardenerRatingSchema);