import express from "express";
const router = express.Router();
import { getNote, getWordSentence } from "../controllers/note.controller.js";

// 단어장 조회
router.get("/", getNote);

// 단어장 단어 예문 조회
router.get("/:word", getWordSentence);

export default router;
