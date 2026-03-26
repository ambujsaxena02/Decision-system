const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { evaluate } = require('./engine');
const Workflow = require('./models/Workflow');
const Decision = require('./models/Decision');

const app = express();

// Explicit CORS to prevent browser blocks
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));
app.use(express.json());

const externalDependencyCheck = async () => {
    // 10% simulated failure rate
    if (Math.random() < 0.1) throw new Error("External Verification Service Timeout");
    return true;
};

// POST: Run Decision Engine
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
            message: error.message 
        });
    }
});

// GET: Fetch Audit Trail for UI
app.get('/history', async (req, res) => {
    try {
        const history = await Decision.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Database Fetch Error" });
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/decisionDB')
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        app.listen(5000, () => console.log("🚀 Server running on Port 5000"));
    })
    .catch(err => console.log("❌ MongoDB Connection Error:", err));