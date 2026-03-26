const Decision = require('./models/Decision');

const evaluate = async (requestId, userData, workflowConfig) => {
    // 1. Idempotency Check
    const existing = await Decision.findOne({ requestId });
    if (existing) {
        return { ...existing._doc, isDuplicate: true, message: "IDEMPOTENCY: Returning cached result." };
    }

    let auditLog = [];
    let overallStatus = 'Approved';

    // 2. Multi-Step Evaluation
    for (const stage of workflowConfig.stages) {
        let stagePassed = true;

        for (const rule of stage.rules) {
            const userValue = userData[rule.field];
            let rulePassed = false;

            if (rule.operator === '>=') rulePassed = userValue >= rule.value;
            else if (rule.operator === '>') rulePassed = userValue > rule.value;
            else if (rule.operator === '==') rulePassed = userValue == rule.value;

            auditLog.push({
                stage: stage.stageName,
                rule: rule.field,
                status: rulePassed ? 'PASSED' : (rule.isMandatory ? 'FAILED' : 'WARNING'),
                message: rulePassed ? 'Criteria met' : rule.failMessage
            });

            if (!rulePassed && rule.isMandatory) {
                stagePassed = false;
                overallStatus = 'Rejected';
            }
        }
        if (!stagePassed) break; // Conditional Branching
    }

    const decision = new Decision({
        requestId,
        userName: userData.name || "Anonymous",
        status: overallStatus,
        auditLog: auditLog
    });

    await decision.save();
    return decision;
};

module.exports = { evaluate };