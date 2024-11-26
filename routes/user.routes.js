import express from "express";
const router = express.Router();

import { join, logIn } from "../controllers/user.controller.js";

// 회원가입
router.post("/join", join);

// 로그인
router.post("/login", logIn);

export default router;
