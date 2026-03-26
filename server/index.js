const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { evaluate } = require('./engine');
const Workflow = require('./models/Workflow');

const app = express();
app.use(cors());
app.use(express.json());

// Simulation of External Dependency
const externalDependencyCheck = async () => {
    if (Math.random() < 0.1) throw new Error("External Verification Service Timeout");
    return true;
};

app.post('/evaluate', async (req, res) => {
    try {
        const { requestId, userData, workflowName } = req.body;

        await externalDependencyCheck();

        const config = await Workflow.findOne({ name: workflowName });
        if (!config) return res.status(404).json({ error: "Workflow not found" });

        const result = await evaluate(requestId, userData, config);
        res.json(result);

    } catch (error) {
        res.status(503).json({ 
            error: "Dependency Failure", 
            message: "The system encountered an external error. Please retry.",
            trace: error.message 
        });
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/decisionDB')
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        app.listen(5000, () => console.log("🚀 System logic complete. Port 5000."));
    })
    .catch(err => console.log("❌ MongoDB Connection Error:", err));