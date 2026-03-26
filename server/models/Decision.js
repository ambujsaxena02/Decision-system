const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
    requestId: { type: String, unique: true },
    userName: String,
    age: Number, // This allows age to be saved
    status: String,
    auditLog: Array,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Decision', DecisionSchema);