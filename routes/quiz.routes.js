import express from "express";
const router = express.Router();
import { getQuizzes } from "../controllers/quiz.controller.js";

router.get("/", getQuizzes);

export default router;
