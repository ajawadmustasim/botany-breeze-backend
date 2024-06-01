import mongoose from "mongoose"

const gardenerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        gardenerID: {
            type: Number,
            required: true,
            unique: true
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