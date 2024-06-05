import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Nursery } from "../models/nursery.model.js";
import { Gardener } from "../models/gardener.model.js";

// Function to add a gardener to a nursery
const addGardener = asyncHandler(async (req, res) => {
    const { name, experience, skills, picture, phone, address, rating } = req.body;
    const nurseryId = req.params.id;

    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const gardener = await Gardener.create({
        name,
        experience,
        skills,
        picture,
        phone,
        address,
        rating
    });

    const nursery = await Nursery.findById(nurseryId);

    if (!nursery) {
        throw new ApiError(404, "Nursery not found");
    }

    nursery.gardenerList.push(gardener._id);
    await nursery.save();

    return res.status(200).json(new ApiResponse(200, gardener, "Gardener added successfully to the nursery"));
});

export { addGardener };
