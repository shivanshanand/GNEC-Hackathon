import express from "express";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import reportRoutes from "./routes/ReportRoutes.js";
import aiRoutes from "./routes/AIRoutes.js";
import connectDB from "./config/ConnectDB.js";
import { configDotenv } from "dotenv";
import helmet from "helmet";

configDotenv();
connectDB();

const app = express();

app.use(helmet());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(compression());

app.use("/api/report", reportRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
