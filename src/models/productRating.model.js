import mongoose from "mongoose";

const productRatingSchema = new mongoose.Schema(
    {
        rating:{
            type: Number
        },
        userDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    }, {timestamps:true}
);

export const ProductRating = mongoose.model("ProductRating", productRatingSchema);