import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {registerTeacher} from "../controllers/teacher.controller.js";

const router = Router();

router.post("/register", verifyJWT, registerTeacher);

export default router;