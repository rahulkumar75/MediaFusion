import { Router } from "express"
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,

} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js" 



const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

    router.route("/login").post(loginUser)

    //SECURED routes
    router.route("/logout").post(verifyJWT,  logoutUser)
    router.route("/referesh-token").post(refreshAccessToken)

export default router
