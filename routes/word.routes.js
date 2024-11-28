import express from "express";
const router = express.Router();
import {
  addWord,
  getWords,
  modifyWord,
  deleteWord,
  getRegisteredDate,
} from "../controllers/word.controller.js";

// 단어 등록
router.post("/", addWord);

// 단어 일자별 조회
router.get("/", getWords);

// 단어 수정
router.put("/:id", modifyWord);

// 단어 삭제
router.delete("/:id", deleteWord);

// 단어가 등록된 일 확인
router.get("/registered", getRegisteredDate);

export default router;
