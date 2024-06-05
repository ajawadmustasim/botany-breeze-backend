import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserDP,  
    updateAccountDetails
} from "../controllers/user.controller.js";
import {
    registerNursery,
    getNurseryDetails,
    updateNurseryDetails,
    addProductToNursery,
    addGardenerToNursery
} from "../controllers/nursery.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// User routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-dp").patch(verifyJWT, upload.single("userDP"), updateUserDP);

// Nursery-specific routes
router.route("/nursery/register").post(verifyJWT, registerNursery);
router.route("/nursery/:id").get(verifyJWT, getNurseryDetails);
router.route("/nursery/:id").patch(verifyJWT, updateNurseryDetails);
router.route("/nursery/:id/add-product").patch(verifyJWT, addProductToNursery);
router.route("/nursery/:id/add-gardener").patch(verifyJWT, addGardenerToNursery);

export default router;
