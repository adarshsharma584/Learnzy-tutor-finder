import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBatch } from "../controllers/batch.controller.js";

const router = Router();

router.post("/:tuitionId/create", verifyJWT, createBatch);

export default router;