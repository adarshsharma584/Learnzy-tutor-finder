import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBatch } from "../controllers/batch.controller.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import { validateCreateBatchBody, validateCreateBatchParams } from "../schemas/batch.schema.js";

const router = Router();

router.post(
  "/:tuitionId/create",
  verifyJWT,
  validateParams(validateCreateBatchParams),
  validateBody(validateCreateBatchBody),
  createBatch
);

export default router;
