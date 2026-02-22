import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerTeacher } from "../controllers/teacher.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { validateRegisterTeacherBody } from "../schemas/teacher.schema.js";

const router = Router();

router.post("/register", verifyJWT, validateBody(validateRegisterTeacherBody), registerTeacher);
router.post("/details", verifyJWT, validateBody(validateRegisterTeacherBody), registerTeacher);

export default router;
