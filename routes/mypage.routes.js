import express from "express";
const router = express.Router();
import { getMypage, getWordHistory } from "../controllers/mypage.controller.js";

// 마이페이지 조회
router.get("/", getMypage);

// 복습 단어 조회
router.get("/history", getWordHistory);

export default router;
