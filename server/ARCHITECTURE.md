# System Architecture

## Design Patterns
- **Stateless Rule Engine**: The engine fetches rules from MongoDB at runtime, allowing updates without code changes.
- **Idempotency Layer**: Uses a unique `requestId` to ensure exactly-once processing, preventing duplicate database entries.

## Tech Stack
- **Node.js/Express**: Backend API layer.
- **MongoDB/Mongoose**: Document store for flexible rule configurations and audit logs.
- **Axios**: Used for simulated external dependency calls.

## Engineering Robustness
- **Failure Handling**: Implemented a 10% random failure simulation in `index.js` to demonstrate how the system returns a 503 error instead of crashing.
- **Audit Trails**: Every decision stores a detailed log of which rules passed and failed for "Explainable AI."