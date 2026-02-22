import { verifyJWT } from "../middlewares/auth.middleware.js";
import { setUserRole, userProfile } from "../controllers/user.controller.js";
import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware.js";
import { validateSetRoleBody } from "../schemas/user.schema.js";

const router = Router();

router.get("/profile", verifyJWT, userProfile);
router.patch("/role", verifyJWT, validateBody(validateSetRoleBody), setUserRole);

export default router;
