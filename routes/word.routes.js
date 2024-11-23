import express from "express";
const router = express.Router();
import { addWord } from "../controllers/word.controller.js";
/* 구현 기능 목록
1. 단어 조회
3. 단어 수정
4. 단어 삭제
5. 예문 생성 */

// 단어 등록
router.post("/", addWord);

export default router;
