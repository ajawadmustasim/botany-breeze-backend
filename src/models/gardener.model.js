import mongoose from "mongoose"

const gardenerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        experience: {
            type: String
        },
        skills: {
            type: String,
        },
        picture: {
            type: String
        },
        phone: {
            type: String 
        },
        address: {
            type: String
        },
        rating: {
            type: Number
        }
    }, {timestamps:true}
) 

export const Gardener = mongoose.model("Gardener", gardenerSchema)