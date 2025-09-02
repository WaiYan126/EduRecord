const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  timestamp: { type: Date, default: Date.now },
  ipAddress: String
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
