import express from "express";
import { createQuiz, getQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/create", createQuiz);
router.get("/:id", getQuiz);

export default router;