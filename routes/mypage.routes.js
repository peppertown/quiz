import express from "express";
const router = express.Router();
import { getMypage } from "../controllers/mypage.controller.js";

// 마이페이지 조회
router.get("/", getMypage);

export default router;
