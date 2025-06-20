const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
const container = document.getElementById("container");

checkBtn.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please input a value");
  } else {
    isPalindrome(textInput.value);
    textInput.value = "";
  }
});

textInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (textInput.value === "") {
      alert("Please input a value");
    } else {
      isPalindrome(textInput.value);
      textInput.value = "";
    }
  }
});

const isPalindrome = (str) => {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversedStr = [...cleanedStr].reverse().join("");

  if (cleanedStr === reversedStr) {
    result.innerText = `${str} is a palindrome`;
    result.style.color = "green";
    container.style.boxShadow = "0 0 25px green";
  } else {
    result.innerText = `${str} is not a palindrome`;
    result.style.color = "red";
    container.style.boxShadow = "0 0 25px red";
  }
};
