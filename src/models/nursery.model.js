import mongoose from "mongoose"

const nurserySchema = new mongoose.Schema(
    {
        nurseryDetails: {
            type: String,
            required: true
        },
        nurseryAddress: {
            type: String,
            required: true,
        },
        nurseryCity: {
            type: String
        },
        nurseryContact: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
        },
        nurseryAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        gardenerList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Gardener"
            }
        ]
    }, {timestamps:true}
) 

export const Nursery = mongoose.model("Nursery", nurserySchema)