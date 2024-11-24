import express from "express";
const router = express.Router();
import {
  generateSenteces,
  getSentences,
} from "../controllers/sentence.controller.js";

// 1. 예문 생성
router.post("/", generateSenteces);

// 2. 예문 조회
router.get("/", getSentences);

export default router;
