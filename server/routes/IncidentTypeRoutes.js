import express from "express";
import {
  getIncidentTypes,
  addIncidentType,
} from "../controllers/IncidentTypesController.js";

const router = express.Router();

router.post("/add-incident", addIncidentType);
router.get("/all", getIncidentTypes);

export default router;
