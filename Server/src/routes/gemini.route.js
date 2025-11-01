import { Router } from "express";
import { generateTestQuestions, compareAnswers } from '../controllers/gemini.controller.js';

const router = Router();

router.post('/test', generateTestQuestions);
router.post('/compare-answers', compareAnswers);

export default router;