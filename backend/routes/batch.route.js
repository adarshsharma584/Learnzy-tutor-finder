import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBatch, listBatchesByTuition } from "../controllers/batch.controller.js";
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
router.post(
  "/:tuitionId",
  verifyJWT,
  validateParams(validateCreateBatchParams),
  validateBody(validateCreateBatchBody),
  createBatch
);
router.get("/tuition/:tuitionId", validateParams(validateCreateBatchParams), listBatchesByTuition);

export default router;
