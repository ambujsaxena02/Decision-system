const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
    name: String, 
    stages: [
        {
            stageName: String,
            rules: [
                {
                    field: String,
                    operator: String,
                    value: Number,
                    failMessage: String,
                    isMandatory: { type: Boolean, default: true }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Workflow', WorkflowSchema);