import express from "express";
import {assistWithAI} from "../controllers/AIController.js";

const router = express.Router();

router.post("/", assistWithAI);

export default router;
