import { Router } from  "express"
import { getAllTuitions, getTuitionById, createTution } from "../controllers/tutions.controller.js"
// import { authenticateUser } from "../middlewares/auth.middleware.js"

const  router = Router();

router.get("/all", getAllTuitions)
router.get("/:id", getTuitionById)
router.post("/create", createTution)

export default  router;