const Decision = require('./models/Decision');

const evaluate = async (requestId, userData, workflowConfig) => {
    // 1. Idempotency Check
    const existing = await Decision.findOne({ requestId });
    if (existing) {
        return { ...existing._doc, isDuplicate: true };
    }

    let auditLog = [];
    let overallStatus = 'Approved';

    // 2. Evaluation Logic
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
                field: rule.field,
                status: rulePassed ? 'PASSED' : 'FAILED',
                message: rulePassed ? `Criteria met: ${rule.field} check` : rule.failMessage
            });

            if (!rulePassed && rule.isMandatory) {
                stagePassed = false;
                overallStatus = 'Rejected';
            }
        }
        if (!stagePassed) break;
    }

    // 3. Save to Database
    const decision = new Decision({
        requestId,
        userName: userData.name,
        age: userData.age, // Saves the actual age entered
        status: overallStatus,
        auditLog: auditLog
    });

    await decision.save();
    return decision;
};

module.exports = { evaluate };