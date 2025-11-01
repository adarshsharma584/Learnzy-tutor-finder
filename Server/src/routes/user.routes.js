import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ========== AUTH ROUTES ==========
router.post("/signup", upload.single("profilePhoto"), registerUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.delete("/logout", authenticateUser, logoutUser);

// ========== PASSWORD ROUTES ==========
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

// ========== USER ROUTES (PROTECTED) ==========
router.get("/me", authenticateUser, getCurrentUser);
router.patch("/update", upload.single("profilePhoto"), authenticateUser, updateUser);
router.delete("/delete", authenticateUser, deleteUser);

export default router;