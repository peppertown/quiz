import express from "express";
const router = express.Router();
import { generateSenteces } from "../controllers/sentence.controller.js";

/* 구현 기능 목록
2. 예문 조회
*/

// 1. 예문 생성
router.post("/", generateSenteces);

export default router;
