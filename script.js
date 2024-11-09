let totalBudget = 0;
let totalExpenses = 0;
const expenseCategories = { Food: 0, Transportation: 0, Entertainment: 0, Rent: 0, Utilities: 0, Other: 0 };

document.getElementById('set-budget').addEventListener('click', () => {
    const budgetInput = parseFloat(document.getElementById('total-budget').value);
    if (budgetInput > 0) {
        totalBudget = budgetInput;
        document.getElementById('budget-amount').innerText = `$${totalBudget.toFixed(2)}`;
        updateRemaining();
    } else {
        alert("Please enter a valid budget amount greater than 0.");
    }
});

function addExpense() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;

    if (expenseName && expenseAmount > 0 && expenseCategory) {
        totalExpenses += expenseAmount;
        expenseCategories[expenseCategory] += expenseAmount;
        updateRemaining();

        const expenseList = document.getElementById('expense-list');
        const li = document.createElement('li');
        li.innerHTML = `${expenseName} (${expenseCategory}): $${expenseAmount.toFixed(2)} 
            <button onclick="removeExpense(this, ${expenseAmount}, '${expenseCategory}')">Remove</button>`;
        expenseList.appendChild(li);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        toggleModal();
        checkBudgetAlerts();
    } else {
        alert("Please enter valid expense details.");
    }
}

function updateRemaining() {
    const remaining = totalBudget - totalExpenses;
    const progress = document.getElementById("progress");

    document.getElementById('expense-amount-total').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('total-remaining').innerText = `$${remaining.toFixed(2)}`;
    
    progress.style.width = `${(totalExpenses / totalBudget) * 100}%`;
    progress.style.backgroundColor = remaining > 0 ? "#00796b" : "#d32f2f";
}

function removeExpense(element, amount, category) {
    totalExpenses -= amount;
    expenseCategories[category] -= amount;
    updateRemaining();
    element.parentElement.remove();
    checkBudgetAlerts();
}

function toggleModal() {
    const modal = document.getElementById("expense-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// Alerts user if any category exceeds a certain threshold of the budget
function checkBudgetAlerts() {
    const warningThreshold = 0.8; // 80% of the total budget
    const criticalThreshold = 1.0; // 100% of the total budget

    for (const [category, spent] of Object.entries(expenseCategories)) {
        if (spent > totalBudget * criticalThreshold) {
            alert(`Critical: You have exceeded the budget in the "${category}" category!`);
        } else if (spent > totalBudget * warningThreshold) {
            alert(`Warning: You are close to exceeding the budget in the "${category}" category.`);
        }
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("expense-modal");
    if (event.target === modal) {
        toggleModal();
    }
};
