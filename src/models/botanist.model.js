import mongoose from "mongoose";

const botanistSchema = new mongoose.Schema(
    {
        qualification: {
            type: String,
            required: true
        },
        rating: {
            type: Number
        },
        verficationStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        userDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }, {timestamps:true}
); 

export const Botanist = mongoose.model("Botanist", botanistSchema);