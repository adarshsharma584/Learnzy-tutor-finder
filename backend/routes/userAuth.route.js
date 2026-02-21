import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyOTP,
} from "../controllers/userAuth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  validateLoginBody,
  validateRegisterBody,
  validateVerifyOtpBody,
} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateBody(validateRegisterBody), registerUser);
router.post("/login", validateBody(validateLoginBody), loginUser);
router.get("/logout", verifyJWT, logoutUser);
router.post("/verify-Otp", verifyJWT, validateBody(validateVerifyOtpBody), verifyOTP);

export default router;
