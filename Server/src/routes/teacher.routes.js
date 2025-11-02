import { Router } from "express"
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { createTeacher, updateTeacher, getAllTeachers, getTeacherById } from "../controllers/teachers.controller.js"

const router = Router();

router.get("/all", getAllTeachers);
router.get("/:id", getTeacherById);
router.post("/create", authenticateUser, createTeacher);
router.patch("/update", authenticateUser, updateTeacher);

export default router;