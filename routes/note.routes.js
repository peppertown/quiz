import express from "express";
const router = express.Router();
import { getNote } from "../controllers/note.controller.js";

// 단어장 조회
router.get("/", getNote);

export default router;
