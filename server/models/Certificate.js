const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  _id: { type: String },  // custom cert ID like "cert_001"
  title: String,
  type: { type: String, enum: ["Workshop", "Internship", "Volunteering", "Certification"] },
  organization: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  file: {
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: String
  },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  submittedAt: { type: Date, default: Date.now },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  verifiedAt: Date,
  remarks: String
});

module.exports = mongoose.model("Certificate", certificateSchema);
