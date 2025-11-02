import { Router } from  "express"
import { getAllTuitions, getTuitionById, createTuition } from "../controllers/tuitions.controller.js"
// import { authenticateUser } from "../middlewares/auth.middleware.js"

const  router = Router();

router.get("/all", getAllTuitions)
router.get("/:id", getTuitionById)
router.post("/create", createTuition)

export default  router;