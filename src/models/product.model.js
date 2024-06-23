import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: ["plant", "flower"],
            default: "plant"
        },
        rating: {
            type: Number
        },
        picture: {
            type: String
        }
    }, {timestamps:true}
) 

export const Product = mongoose.model("Product", productSchema)