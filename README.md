🛡️ Resilient Decision Engine
A high-performance, rule-based validation system built for reliability and transparency.

This project demonstrates a robust backend architecture capable of handling automated decision-making with built-in idempotency, fault tolerance, and a real-time audit trail.

🚀 Key Features
Explainable AI (Audit Logs): Every decision is backed by a step-by-step reasoning log.

Idempotency: Prevents duplicate processing of the same Request ID.

Resilient Architecture: Simulated "External Dependency Checks" with built-in error handling.

Glassmorphism UI: A modern, real-time dashboard built with React and Vite.

🛠️ Tech Stack
Frontend: React.js, Axios, Vite

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

📥 Quick Setup
1. Database Setup
Ensure MongoDB is running locally on port 27017.

Bash
cd server
npm install
node seed.js
2. Run the System
Start Backend:

Bash
node index.js
Start Frontend:

Bash
cd client
npm install
npm run dev
📋 Example Decision Logic
Age Check: Must be >= 18.

Income Check: Must be >= 25,000.

Audit Log: Logs exact failure reasons (e.g., "Low Income").

Developed with 💜 by Ambuj Saxena
