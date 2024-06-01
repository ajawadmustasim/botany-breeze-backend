import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true,
            unique: true
        },
        specie: {
            type: String
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