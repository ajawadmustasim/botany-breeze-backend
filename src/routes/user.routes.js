import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserDP,  
    updateAccountDetails,
    getCurrentUserType,
    getUserTypeById
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").post(verifyJWT, updateAccountDetails)

router.route("/update-db").patch(verifyJWT, upload.single("userDP"), updateUserDP)

router.route("/user-type").get(verifyJWT, getCurrentUserType)
router.route("/user-type/:id").get(verifyJWT, getUserTypeById)

//router.route("/history").get(verifyJWT, getWatchHistory)

export default router
