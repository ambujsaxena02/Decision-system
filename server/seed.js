const mongoose = require('mongoose');
const Workflow = require('./models/Workflow');

mongoose.connect('mongodb://127.0.0.1:27017/decisionDB');

const seed = async () => {
    await Workflow.deleteMany({});
    await Workflow.create({
        name: "General-Approval",
        stages: [
            {
                stageName: "Eligibility",
                rules: [
                    { field: "age", operator: ">=", value: 18, failMessage: "Underage", isMandatory: true },
                    { field: "income", operator: ">=", value: 30000, failMessage: "Low Income", isMandatory: true }
                ]
            }
        ]
    });
    console.log("✅ Database Seeded!");
    process.exit();
};
seed();