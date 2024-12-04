import express from "express";
const router = express.Router();
import {
  generateSenteces,
  getSentences,
  regenerateSentence,
} from "../controllers/sentence.controller.js";

// 1. 예문 생성
router.post("/", generateSenteces);

// 2. 예문 조회
router.get("/", getSentences);

// 3. 예문 재생성
router.post("/regenerate", regenerateSentence);

export default router;
