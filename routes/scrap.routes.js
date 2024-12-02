import express from "express";
const router = express.Router();
import {
  handleScraps,
  getScraps,
  deleteScrap,
} from "../controllers/scrap.controller.js";

// 스크랩 추가/제거
router.post("/:id", handleScraps);

// 스크랩 목록 조회
router.get("/", getScraps);

// 스크랩 제거
router.delete("/:id", deleteScrap);

export default router;
