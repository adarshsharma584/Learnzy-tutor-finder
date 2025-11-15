import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema, verifySchema, updateUserSchema } from "../schemas/user.schema.js";
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
router.post("/register", upload.single("profilePhoto"), validate(registerSchema), registerUser);
router.post("/verify", validate(verifySchema), verifyUser);
router.post("/login", validate(loginSchema), loginUser);
router.delete("/logout", authenticateUser, logoutUser);

// ========== PASSWORD ROUTES ==========
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

// ========== USER ROUTES (PROTECTED) ==========
router.get("/me", authenticateUser, getCurrentUser);
router.patch("/update", upload.single("profilePhoto"), authenticateUser, validate(updateUserSchema), updateUser);
router.delete("/delete", authenticateUser, deleteUser);

export default router;