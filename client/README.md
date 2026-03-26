🛡️ Resilient Decision Engine
A robust, full-stack automated decisioning system designed to handle user applications through a configurable rules engine. This project focuses on high availability, auditability, and engineering excellence.

🚀 Key Features (Engineering Highlights)
1. Explainable AI & Auditability
Every decision made by the system is stored in a MongoDB Audit Trail.

Each record includes a "Rule Trace" (Reasoning).

Provides a full history of why a user was Approved or Rejected.

Meets the requirement for transparent decision-making.

2. Idempotency (Duplicate Protection)
The system is built to be resilient. If the same user data is submitted multiple times (e.g., due to a slow network or double-clicking), the backend identifies the duplicate and returns the cached result instead of cluttering the database or wasting processing power.

3. Configurable Workflow Engine
Instead of hardcoding "Age > 18," I built a Workflow Schema.

Rules are fetched dynamically from the database.

Logic is decoupled from the main server code using a standalone engine.js.

Allows for "Business Logic" updates without redeploying code.

4. External Dependency Simulation
The system simulates an external "Blacklist Service" check before running internal rules, demonstrating how the engine handles third-party service integration.

🛠️ Tech Stack
Frontend: React.js + Vite (Custom Glassmorphism UI)

Backend: Node.js + Express

Database: MongoDB (Mongoose ODM)

Communication: Axios for REST API calls

📂 Project Structure
Plaintext
decision-system/
├── client/              # React Frontend (Vite)
│   └── src/App.jsx      # Modern UI & State Management
├── server/              # Node.js Backend
│   ├── models/          # Database Schemas
│   │   ├── Decision.js  # Audit Logs
│   │   └── Workflow.js  # Rule Configurations
│   ├── engine.js        # The Core Logic (Brain)
│   └── index.js         # API & Idempotency Logic
└── README.md            # You are here!
⚡ How to Run
1. Start the Backend
Bash
cd server
npm install
node index.js
Wait for "✅ MongoDB Connected" message.

2. Start the Frontend
Bash
cd client
npm install
npm run dev
Open the provided Local link (usually http://localhost:5173 or 5174).

🧪 Testing the Robustness
The Adult Rule: Enter Name: Shivam, Age: 22 -> Approved.

The Minor Rule: Enter Name: Kid, Age: 12 -> Rejected.

The Idempotency Check: Submit the same name twice; notice the instant response and recorded trace.

The Blacklist Check: (Optional) If you manually add "BadActor" to the engine blacklist, the system rejects immediately regardless of age.

Developed with focus on Scalability and Explainability.