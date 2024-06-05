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
    registerBotanist,
    getBotanistDetails,
    updateBotanistVerificationStatus,
    updateBotanistRating
} from "../controllers/botanist.controller.js";
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

// Botanist-specific routes
router.route("/register-botanist").post(registerBotanist);
router.route("/botanist/:id").get(verifyJWT, getBotanistDetails);
router.route("/botanist/update-verification-status").patch(verifyJWT, updateBotanistVerificationStatus);
router.route("/botanist/update-rating").patch(verifyJWT, updateBotanistRating);

export default router;