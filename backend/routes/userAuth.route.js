import {Router} from "express";
import { loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/userAuth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", verifyJWT, logoutUser);
router.post("/verify-Otp", verifyJWT, verifyOTP);

export default router;