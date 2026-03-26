const mongoose = require('mongoose');

// This tracks every request and its "Rule Trace" for full Auditability
const DecisionSchema = new mongoose.Schema({
    userName: String,
    age: Number,
    status: { type: String, enum: ['Approved', 'Rejected', 'Manual Review'] }, // State management
    auditLog: [String], // Records exactly which rules were triggered
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Decision', DecisionSchema);