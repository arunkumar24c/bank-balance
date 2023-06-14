'use strict';

const balance = document.getElementById('balance');

const moneyPlus = document.getElementById('money-plus');

const moneyMinus = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const transaction = document.getElementById('transaction');

const amount = document.getElementById('amount');

// let transactions = [];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//generateRandomID

const generateRandomID = function () {
  return Math.floor(Math.random() * 10000);
};

//addTransactionDOM

const addTransactionDOM = function (transaction) {
  //Get sign of the amount
  const sign = transaction.amount < 0 ? '-' : '+';

  //creat an li element
  const item = document.createElement('li');

  //adding class to item based on the amount

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.transaction}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick = "removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);

  updateLocalStorage();
};

const removeTransaction = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  updateValues();

  init();
};

const updateLocalStorage = function () {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const updateValues = function () {
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  moneyPlus.innerHTML = `₹ ${income}`;
  moneyMinus.innerHTML = `₹ ${expense}`;

  balance.innerHTML = `₹ ${total}`;
};
//Event Listeners

//form Event Listeners

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (transaction.value.trim() === '' || amount.value.trim() === '') {
    alert('Enter correct transaction details');
  } else {
    const newTransaction = {
      id: generateRandomID(),
      transaction: transaction.value,
      amount: +amount.value,
    };

    transactions.push(newTransaction);

    addTransactionDOM(newTransaction);

    updateValues();
  }
});

//initial settings

const init = function () {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();


