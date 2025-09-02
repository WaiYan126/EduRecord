const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rollNo: { type: String, unique: true },
  fullName: String,
  program: String,  // e.g., B.Tech CSE
  yearOfStudy: Number,
  department: String,
  cgpa: { type: Number, min: 0, max: 10 },
  profilePicUrl: String,
  certificateIds: [{ type: String, ref: "Certificate" }]
});

module.exports = mongoose.model("Student", studentSchema);
