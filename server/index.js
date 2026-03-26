const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Decision = require('./models/Decision'); 
const Workflow = require('./models/Workflow');
const { evaluate } = require('./engine');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/decisionDB')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error: ", err));

// Simulation of an External Dependency (Required by PDF)
const checkExternalBlacklist = async (name) => {
    // Simulate a 1-second delay for an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const blacklist = ["BadActor", "FraudUser"];
    return blacklist.includes(name);
};

app.post('/evaluate', async (req, res) => {
    const { userName, age } = req.body;

    try {
        // 1. IDEMPOTENCY CHECK (Engineering Robustness Marks)
        const existingDecision = await Decision.findOne({ userName, age });
        if (existingDecision) {
            return res.json({ 
                status: existingDecision.status, 
                logs: ["IDEMPOTENCY: Returning previously calculated result."],
                isDuplicate: true 
            });
        }

        // 2. EXTERNAL DEPENDENCY SIMULATION
        const isBlacklisted = await checkExternalBlacklist(userName);
        if (isBlacklisted) {
            return res.json({ status: "Rejected", logs: ["FAILED: User is on external blacklist."] });
        }

        // 3. FETCH CONFIGURABLE RULES
        let config = await Workflow.findOne({ name: "General-Approval" });
        if (!config) {
            config = new Workflow({
                name: "General-Approval",
                rules: [{ field: "age", operator: ">=", value: 18 }]
            });
            await config.save();
        }

        // 4. EXECUTE ENGINE
        const result = evaluate(req.body, config.rules);

        // 5. SAVE AUDIT TRAIL
        const decisionEntry = new Decision({
            userName,
            age,
            status: result.status,
            auditLog: result.logs
        });
        await decisionEntry.save();

        res.json(result);

    } catch (error) {
        console.error("Evaluation Error:", error);
        res.status(500).json({ error: "Failure handling triggered: Database or Dependency error." });
    }
});

app.get('/history', async (req, res) => {
    try {
        const history = await Decision.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch history" });
    }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));