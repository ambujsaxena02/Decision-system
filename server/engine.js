// This function can handle ANY rule you throw at it (Age, Salary, Score, etc.)
const evaluate = (userData, rules) => {
    let logs = [];
    let isApproved = true;

    rules.forEach(rule => {
        const userValue = userData[rule.field];
        
        // Dynamic check: compare user data against the rule in the database
        if (rule.operator === ">=" && userValue < rule.value) {
            isApproved = false;
            logs.push(`FAILED: ${rule.field} is ${userValue}, but must be at least ${rule.value}.`);
        } else {
            logs.push(`PASSED: ${rule.field} check.`);
        }
    });

    return { 
        status: isApproved ? "Approved" : "Rejected", 
        logs 
    };
};

module.exports = { evaluate };