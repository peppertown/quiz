import express from "express";
const router = express.Router();
import {
  getAllQuizzes,
  handleWrongWords,
  getDateQuiz,
} from "../controllers/quiz.controller.js";

// 퀴즈 리스트 생성
router.get("/all", getAllQuizzes);

// 퀴즈 피드백
router.post("/", handleWrongWords);

// 날짜별 퀴즈 리스트 생성
router.get("/", getDateQuiz);

export default router;
