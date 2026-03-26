const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
    name: String, // e.g., "Student-Onboarding"
    rules: [
        {
            field: String,     // e.g., "age"
            operator: String,  // e.g., ">="
            value: Number,     // e.g., 18
            failMessage: String 
        }
    ]
});

module.exports = mongoose.model('Workflow', WorkflowSchema);