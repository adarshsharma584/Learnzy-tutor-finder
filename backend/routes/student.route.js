import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { registerStudent } from "../controllers/student.controller.js";
import { validateRegisterStudentBody } from "../schemas/student.schema.js";

const router = Router();

router.post("/details", verifyJWT, validateBody(validateRegisterStudentBody), registerStudent);
router.post("/register", verifyJWT, validateBody(validateRegisterStudentBody), registerStudent);

export default router;
