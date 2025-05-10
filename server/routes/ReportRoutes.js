import express from "express";
import {
  submitReport,
  getReports,
  updatestatus,
} from "../controllers/ReportController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/submit", upload.array("evidence", 5), submitReport);
router.get("/all", getReports);
router.put("/:id", updatestatus);

export default router;
