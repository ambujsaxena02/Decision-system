const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
    requestId: { type: String, unique: true },
    userName: String,
    status: String,
    auditLog: Array,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Decision', DecisionSchema);