import express from "express";
const router = express.Router();

import { join } from "../controllers/user.controller";

// 회원가입
router.post("/join", join);

export default router;
