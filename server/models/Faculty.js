const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  department: String,
  designation: String,
  verifiedCertificates: [{ type: String, ref: "Certificate" }]
});

module.exports = mongoose.model("Faculty", facultySchema);
