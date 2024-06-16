import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
        picture: {
            type: String
        }
    }, {timestamps:true}
) 

export const Product = mongoose.model("Product", productSchema)