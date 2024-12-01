import express from "express";
const router = express.Router();
import { handleScraps } from "../controllers/scrap.controller.js";

// 스크랩 추가/제거
router.post("/:id", handleScraps);

export default router;
