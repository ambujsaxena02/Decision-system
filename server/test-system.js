const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const API_URL = 'http://localhost:5000/evaluate';
const testId = uuidv4(); 

const testData = {
    requestId: testId,
    workflowName: "General-Approval",
    userData: { name: "TestUser", age: 25, income: 50000 }
};

async function run() {
    console.log("🚀 Starting Tests...");
    try {
        console.log("1. Testing Happy Path...");
        const r1 = await axios.post(API_URL, testData);
        console.log("Result:", r1.data.status);

        console.log("2. Testing Idempotency...");
        const r2 = await axios.post(API_URL, testData);
        console.log("Result:", r2.data.message || "Processed again (Fail)");
    } catch (e) {
        console.log("Error in Test:", e.response?.data?.message || e.message);
    }
}
run();