import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    required: true,
    enum: [
      "Harassment",
      "Discrimination",
      "Abuse",
      "Bullying",
      "Violence",
      "Other",
    ],
  },
  description: { type: String, required: true },
  location: { type: String },
  generatedDraft: { type: String },
  status: {
    type: String,
    enum: ["active", "resolved"],
    default: "active",
  },
  finalReport: { type: String },
  evidenceUrl: { type: [String], required: false },
  timestamp: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;
