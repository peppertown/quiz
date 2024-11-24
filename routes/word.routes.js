import express from "express";
const router = express.Router();
import {
  addWord,
  getWords,
  modifyWord,
  deleteWord,
} from "../controllers/word.controller.js";
/* 구현 기능 목록
5. 예문 생성 */

// 단어 등록
router.post("/", addWord);

// 단어 일자별 조회
router.get("/", getWords);

// 단어 수정
router.put("/:id", modifyWord);

// 단어 삭제
router.delete("/:id", deleteWord);

export default router;
