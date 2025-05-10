import nodemailer from "nodemailer";
import Report from "../models/Report.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true, // Add this
});

// Async function to send the email
const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Function to verify CAPTCHA
const verifyCaptcha = async (captcha) => {
  if (!captcha) throw new Error("Captcha is required");

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  const captchaResponse = await axios.post(verificationURL);
  if (!captchaResponse.data.success) {
    throw new Error("Failed CAPTCHA verification");
  }
};

export const submitReport = async (req, res) => {
  try {
    const {
      incidentType,
      description,
      location,
      generatedDraft,
      finalReport,
      recipient,
      captcha,
    } = req.body;

    // 1. CAPTCHA verification
    await verifyCaptcha(captcha);

    // 2. Validate Incident Type (use enum validation directly in schema)
    if (
      !["Harassment", "Discrimination", "Abuse", "Bullying", "Other"].includes(
        incidentType
      )
    ) {
      return res.status(400).json({ error: "Invalid incident type" });
    }

    // 3. Proceed if CAPTCHA passed and Incident Type is valid
    const evidenceUrls = req.files ? req.files.map((file) => file.path) : [];

    const finalVersion = finalReport?.trim() ? finalReport : generatedDraft;

    const newReport = new Report({
      incidentType,
      description,
      location,
      evidenceUrl: evidenceUrls,
      generatedDraft,
      finalReport: finalVersion,
    });

    await newReport.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: `New Report Submission - ${incidentType}`,
      html: `
        <h3>New Report Submitted</h3>
        <p><strong>Incident Type:</strong> ${incidentType}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Final Report:</strong> ${finalVersion}</p>
        <p><strong>Evidence:</strong> ${
          evidenceUrls.length > 0
            ? evidenceUrls
                .map((url) => `<a href="${url}">${url}</a>`)
                .join(", ")
            : "No evidence uploaded"
        }</p>
      `,
    };

    await sendEmail(mailOptions);

    res
      .status(201)
      .json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};

export const updatestatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "resolved"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.status = status;
    await report.save();

    res
      .status(200)
      .json({ message: "Report status updated successfully", report });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ timestamp: -1 })
      .populate("incidentType", "type");
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
