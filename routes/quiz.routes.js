import express from "express";
const router = express.Router();
import {
  getQuizzes,
  handleWrongWords,
} from "../controllers/quiz.controller.js";

// 퀴즈 리스트 생성
router.get("/all", getQuizzes);

// 퀴즈 피드백
router.post("/", handleWrongWords);

export default router;
