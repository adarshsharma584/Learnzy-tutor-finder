import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").delete(authenticateUser, logoutUser);

export default router;