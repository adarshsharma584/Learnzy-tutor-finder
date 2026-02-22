import { Router } from "express";
import {
  listMyTuitions,
  registerTuitionCenter,
} from "../controllers/tuitionCenter.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { validateRegisterTuitionBody } from "../schemas/tuition.schema.js";

const router = Router();

router.post(
  "/register",
  verifyJWT,
  validateBody(validateRegisterTuitionBody),
  registerTuitionCenter
);
router.post("/create", verifyJWT, validateBody(validateRegisterTuitionBody), registerTuitionCenter);
router.get("/my", verifyJWT, listMyTuitions);

export default router;
