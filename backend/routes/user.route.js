import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userProfile } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.get("/profile", verifyJWT, userProfile);

export default router;
