import multer from "multer";
import { storage } from "../utils/cloudinaryConfig.js";

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;
