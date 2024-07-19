// Price of item
let price = 1.87;
// Cash In Drawer
let cid = [
  ['PENNY', .50],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

// HTML element variables
const cash = document.getElementById("cash");
const change = document.getElementById("change-due");
const purchase = document.getElementById("purchase-btn");

// US currency units
let currencyUnits = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

// Register Logic Function
const register = () => {
  const cashValue = parseFloat(cash.value);
  const changeDue = cashValue - price;
  if(cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if(cashValue === price) {
    change.innerText = "No change due - customer paid with exact cash";
    return;
  }
// Outputs the change due and the status of the cash register
  const changeResult = getChange(changeDue, cid);

  if(changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
    change.innerText = `Status: ${changeResult.status} ${formatChange(changeResult.change)}`;
  }
  else {
    let changeText = `Status: OPEN ${formatChange(changeResult.change)}`;
    change.innerText = changeText.trim();
  }
};

// Function to calculate change
const getChange = (changeDue, cid) => {
  let totalCid = parseFloat(cid.reduce((sum, [_,amount]) => sum + amount, 0).toFixed(2));
  
  if(totalCid < changeDue) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  let changeArray = [];
  let remainingChange = changeDue;
  for(let i = currencyUnits.length - 1; i >= 0; i--) {
    let unit = currencyUnits[i][0];
    let unitValue = currencyUnits[i][1];
    let unitInDrawer = cid[i][1];
    if(unitValue <= remainingChange && unitInDrawer > 0) {
      let amountFromUnit = 0;

      while(remainingChange >= unitValue && unitInDrawer > 0) {
        remainingChange = (remainingChange - unitValue).toFixed(2);
        unitInDrawer -= unitValue;
        amountFromUnit += unitValue;
      }
      if(amountFromUnit > 0) {
        changeArray.push([unit, amountFromUnit])
      }
    }
  }
  if(remainingChange > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  if(changeDue === totalCid) {
    return {status: "CLOSED", change: cid}
  }
  return {status: "OPEN", change: changeArray}
};

// Formats the change
const formatChange = (changeArray) => {
  return changeArray
    .filter(([unit, amount]) => amount > 0) // Filter out entries with amount 0
    .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
    .join(" ");
};

// Starts the program when the button is clicked
purchase.addEventListener("click", () => {
  register();
});

// Start the program when the enter key is pressed while the cursor is in the input field
cash.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    register();
  }
});