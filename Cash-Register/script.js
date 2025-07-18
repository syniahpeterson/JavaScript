// Cost of Item
let price = 3.26;

// Cash in Drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// HTML Variables
let cash = document.getElementById("cash");
let changeDueElement = document.getElementById("change-due");
let purchaseBtn = document.getElementById("purchase-btn");
let cidElement = document.getElementById("cash-in-drawer");
let changeDisplay = document.getElementById("change");
let priceElement = document.getElementById("price");

// Displays cash in drawer (function)
const displayCashInDrawer = () => {
  cidElement.innerHTML =
    "<h4>Cash in Drawer:</h4>" +
    cid.map((c) => `${c[0]}: $${c[1].toFixed(2)} <br>`).join("");
};

// Register Function
const checkRegister = () => {
  // Variable that holds the user input
  let cashGiven = parseFloat(cash.value);
  // Checks if input is a number
  if (isNaN(cashGiven)) {
    alert("Please enter a valid amount.");
    return;
  }

  // Input is reset
  cash.value = "";

  // Variables for register operations
  let changeDue = Number((cashGiven - price).toFixed(2));
  let changeArray = [];
  let cidCopy = cid.map((cash) => [...cash]);
  let totalCid = Number(cidCopy.reduce((sum, c) => sum + c[1], 0).toFixed(2));

  // Displays change
  changeDisplay.innerHTML = `<b>Change Due:</b> $${changeDue.toFixed(2)}`;

  // Checks edge cases: customer pays exact change, customer doesn't pay enough, or there isn't enough change in the drawer
  if (cashGiven < price) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  } else if (cashGiven === price) {
    changeDueElement.innerHTML =
      "No change due - customer paid with exact cash.";
    return;
  } else if (changeDue > totalCid) {
    changeDueElement.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Holds the value and name of the currency
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  const denominationNames = [
    "PENNY",
    "NICKEL",
    "DIME",
    "QUARTER",
    "ONE",
    "FIVE",
    "TEN",
    "TWENTY",
    "ONE HUNDRED",
  ];

  // Loops through the currency from highest to lowest to get the change - greedy method
  for (let i = denominations.length - 1; i >= 0; i--) {
    let totalDenom = 0;
    while (changeDue >= denominations[i] && cidCopy[i][1] >= denominations[i]) {
      changeDue = Number((changeDue - denominations[i]).toFixed(2));
      cidCopy[i][1] = Number((cidCopy[i][1] - denominations[i]).toFixed(2));
      totalDenom += denominations[i];
    }
    if (totalDenom > 0) {
      changeArray.push([denominationNames[i], totalDenom]);
    }
  }

  // if all the cash has been looped through and there is still change to be given then there is not enough money in the drawer
  if (changeDue > 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Calculates the remaining change in the drawer
  let remainingCid = Number(
    cidCopy.reduce((sum, c) => sum + c[1], 0).toFixed(2)
  );

  // If there is no money in the drawer then the drawer is closed, other wise the draweer is left open
  if (remainingCid === 0) {
    changeDueElement.innerHTML =
      "Status: CLOSED<br>" +
      changeArray
        .map((c) => `<b>${c[0]}</b>: $${c[1].toFixed(2)}`)
        .join("<br>");
    cid = cid.map(([name]) => [name, 0]);
  } else {
    changeDueElement.innerHTML =
      "Status: OPEN<br>" +
      changeArray
        .map((c) => `<b>${c[0]}</b>: $${c[1].toFixed(2)}`)
        .join("<br>");
    cid = cidCopy;
  }

  // The cash in drawer function is called
  displayCashInDrawer();
};

// Event Listeners to start the app
window.onload = displayCashInDrawer;
priceElement.textContent = price;
purchaseBtn.addEventListener("click", checkRegister);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkRegister();
  }
});

const toggle = document.getElementById("modeToggle");

toggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
  document.getElementById("container").classList.toggle("dark-mode");
});
