import { Router } from "express";
import {
  getTuitionById,
  listAllTuitions,
  listMyTuitions,
  registerTuitionCenter,
} from "../controllers/tuitionCenter.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import { validateRegisterTuitionBody, validateTuitionIdParams } from "../schemas/tuition.schema.js";

const router = Router();

router.post(
  "/register",
  verifyJWT,
  validateBody(validateRegisterTuitionBody),
  registerTuitionCenter
);
router.post("/create", verifyJWT, validateBody(validateRegisterTuitionBody), registerTuitionCenter);
router.get("/my", verifyJWT, listMyTuitions);
router.get("/all", listAllTuitions);
router.get("/:tuitionId", validateParams(validateTuitionIdParams), getTuitionById);

export default router;
