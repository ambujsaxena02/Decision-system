🛡️ Resilient Decision Engine (Hackathon Submission)
A robust, full-stack automated decisioning system built with a decoupled rules engine to handle complex user applications. This project focuses on Engineering Robustness, Auditability, and High Availability.

🚀 Engineering Highlights
1. Explainable AI & Auditability (Requirement #10)
Unlike "black-box" systems, every decision is stored in a MongoDB Audit Trail.

Rule Trace: Every response includes a detailed breakdown of which specific rules passed or failed.

Reasoning: Provides a full history for "Approved" or "Rejected" states, ensuring compliance and transparency.

2. Idempotency & Atomic Requests (Requirement #16)
The system is built to be Fault-Tolerant.

Duplicate Protection: Uses a unique requestId to identify duplicate submissions (e.g., from network retries).

Cached Results: If a duplicate is detected, the system returns the existing result instantly without re-processing, preserving database integrity.

3. Stateless Workflow Engine (Requirement #17)
Logic is decoupled from the API layer using a standalone engine.js.

Dynamic Config: Rules are not hardcoded. They are fetched from a Workflow schema, allowing business logic updates (e.g., changing "Age > 18" to "Age > 21") without a single line of code change.

Multi-Step Evaluation: Supports "Stages" to handle complex, multi-layered decisioning.

4. Failure Handling (Requirement #28)
The system simulates an External Bureau Dependency with a built-in 10% failure rate.

Graceful Degradation: Instead of crashing, the system catches timeouts and returns a 503 Service Unavailable with a retry suggestion, demonstrating professional error handling.

🛠️ Tech Stack
Frontend: React.js + Vite (Modern Glassmorphism UI)

Backend: Node.js + Express

Database: MongoDB + Mongoose (Document-based for flexible rule schemas)

Testing: Axios + UUID for automated robustness verification

⚡ Setup & Installation
1. Database Setup
Ensure MongoDB is running locally, then seed the initial rules:

Bash
cd server
npm install
node seed.js
2. Start the Backend
Bash
node index.js
Wait for: ✅ MongoDB Connected Successfully

3. Start the Frontend
Bash
cd ../client
npm install
npm run dev
🧪 Automated Verification (For Judges)
To verify the Idempotency and Rule Evaluation requirements without using the UI, run my custom test suite:

Bash
cd server
node test-system.js
This script proves:

Happy Path: Successful rule processing.

Idempotency: Instant recognition of duplicate requestId.

Audit Log: Verification of the rule trace in the JSON response.

Developed with a focus on Scalability, Explainability, and Atomic State Management.