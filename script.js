const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
];

let transactions = JSON.parse(localStorage.getItem("APP_TRANSACTIONS")) ? JSON.parse(localStorage.getItem("APP_TRANSACTIONS")) : [];

// Update Local Storage
const updateLocalStorage = () => {
    localStorage.setItem("APP_TRANSACTIONS", JSON.stringify(transactions));
};

// Add transactions to DOM list
const addTransactions = () => {
    list.innerHTML = transactions
        .map((transaction) => {
            const sign = transaction.amount > 0 ? "+" : "-";
            const className = transaction.amount > 0 ? "plus" : "minus";

            return `
			<li id=${transaction.id} class=${className}>
				${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
				<button class="delete-btn">x</button>
			</li>`;
        })
        .join("");
};

// Update the balance, income and expense
const updateBalance = () => {
    const total = transactions.reduce((acc, item) => {
        acc += item.amount;
        return acc;
    }, 0);

    const moneyPlusTotal = transactions
        .filter((item) => item.amount > 0)
        .reduce((acc, item) => {
            acc += item.amount;
            return acc;
        }, 0);

    const moneyMinusTotal = transactions
        .filter((item) => item.amount < 0)
        .reduce((acc, item) => {
            acc += item.amount;
            return acc;
        }, 0);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${moneyPlusTotal}`;
    money_minus.innerText = `-$${Math.abs(moneyMinusTotal)}`;
};

// Generate id
const generateID = () => {
    return Math.floor(Math.random() * 1000000);
};

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.text.value === "" || e.target.amount.value === "") {
        alert("Please enter balance type and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: e.target.text.value,
            amount: +e.target.amount.value,
        };

        text.value = "";
        amount.value = "";

        transactions.push(transaction);
        updateLocalStorage();
        addTransactions();
        updateBalance();
    }
});

// Remove transaction
document.addEventListener("click", (e) => {
    if (e.target.className === "delete-btn") {
        const id = +e.target.parentElement.id;

        removeTransaction(id);
        updateLocalStorage();
        addTransactions();
        updateBalance();
    }
});

const removeTransaction = (id) => {
    transactions = transactions.filter((item) => {
        return item.id !== id;
    });
};

document.addEventListener("DOMContentLoaded", () => {
    addTransactions();
    updateBalance();
});
