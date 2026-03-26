# 🛡️ Resilient Decision Engine
### **Automated Rule Validation & Audit System**

This project demonstrates a high-performance backend architecture designed for automated decision-making. It features **Idempotency**, **Explainable AI audit trails**, and a **Resilient Service Layer**.

---

## 🚀 Key Features

* **🧠 Explainable AI (Audit Logs):** Every decision is backed by a step-by-step reasoning log stored in MongoDB.
* **🔄 Idempotency Protection:** Prevents duplicate processing of the same Request ID to ensure data integrity.
* **⚡ Resilient Architecture:** Includes simulated "External Dependency Checks" with built-in error handling to mimic unstable real-world APIs.
* **✨ Glassmorphism UI:** A modern, dark-themed dashboard built with React and Vite for a premium user experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Axios, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Tracking** | UUID v4 (Request Tracking) |

---
### 2. Launch the System**Start Backend:**```bash

node index.js

Start Frontend:
Bash
cd client
npm install
npm run dev



📋 Business Logic Example
The engine evaluates users based on a multi-stage workflow:

Age Check: Must be >= 18.

Income Check: Must be >= 25,000.

Audit Log: If rejected, the system logs the exact failure point (e.g., "Criteria failed: Low Income").

Developed with 💜 by Ambuj Saxena

