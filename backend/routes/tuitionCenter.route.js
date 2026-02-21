import { Router } from "express";
import { registerTuitionCenter } from "../controllers/tuitionCenter.controller.js";

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

export default router;
