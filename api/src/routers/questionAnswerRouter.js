import express from "express";
import { sendQuestion } from "../controllers/questionAnswerController.js";

const router = express.Router();

router.post("/send-question", sendQuestion);

export default router;
