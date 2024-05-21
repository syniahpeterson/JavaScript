const userInput = document.getElementById('text-input');
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
// function to check for palindrome
function palindromeChecker(input) {
  if (input === "") {
    alert("Please input a value");
    return;
  }
  result.replaceChildren();
  const upperInput = input.replace(/[^A-Za-z0-9]/gi, "").toUpperCase();
  let message = `<strong>${input}</strong> ${upperInput === [...upperInput].reverse().join("") ? "is" : "is not"} a palindrome.`;
  const statement = document.createElement("p");
  statement.className = "user-input";
  statement.innerHTML = message;
  result.appendChild(statement);
};
// button click
checkBtn.addEventListener("click", () => {
  palindromeChecker(userInput.value);
  userInput.value = "";
});
// enter key
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    palindromeChecker(userInput.value);
    userInput.value = "";
  }
});