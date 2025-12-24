import { Router } from "express";
import { registerTuitionCenter } from "../controllers/tuitionCenter.controller.js";

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/register", verifyJWT, registerTuitionCenter);


export default router;