import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        userID: {
            type: Number,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            default: "customer"
        },
        phone: {
            type: String
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        userDP: {
            type: String
        },
        purchaseHistory: [
            {

            }
        ],
        sellingHistory: [
            {
                
            }
        ]
    }, {timestamps:true}
) 

export const User = mongoose.model("User", userSchema)