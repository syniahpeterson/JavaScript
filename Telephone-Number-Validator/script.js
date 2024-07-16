// Variable declarations from html elements
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

// Function that check if the number entered is valid
function numberChecker(input) {
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }
  const country = '^(1\\s?)?';
  const area = '(\\([0-9]{3}\\)|[0-9]{3})';
  const dashes = '[\\s\\-]?';
  const number = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  const regex = new RegExp(`${country}${area}${dashes}${number}`);

// The result of the number entered is displayed
if(regex.test(input)){
  results.innerText += "Valid US number: " + input + "\n";
}
else {
  results.innerText += "Invalid US number: " + input + "\n";
}
};

// Checks for clicks of the checkBtn to start program
checkBtn.addEventListener("click", () => {
  numberChecker(userInput.value);
  results.value += userInput;
  userInput.value = "";
});

// Checks for click of enter key to start program
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    numberChecker(userInput.value);
    userInput.value = "";
  }
});

// Checks for click of clearBtn to clear results div
clearBtn.addEventListener("click", () => {
  results.innerHTML = "";
})