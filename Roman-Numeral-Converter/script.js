const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {
  inputValidation(input.value);
  outputDisplay();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    inputValidation(input.value);
    outputDisplay();
  }
});

const inputValidation = (number) => {
  if (number === "") {
    output.textContent = "Please enter a valid number";
    reset();
  } else if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    reset();
  } else if (number > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
    reset();
  } else {
    convertToRoman(input.value);
    reset();
  }
};

const convertToRoman = (number) => {
  output.textContent = "";
  while (number > 0) {
    if (number >= 1000) {
      output.textContent += "M";
      number -= 1000;
    } else if (number >= 900) {
      output.textContent += "CM";
      number -= 900;
    } else if (number >= 500) {
      output.textContent += "D";
      number -= 500;
    } else if (number >= 400) {
      output.textContent += "CD";
      number -= 400;
    } else if (number >= 100) {
      output.textContent += "C";
      number -= 100;
    } else if (number >= 90) {
      output.textContent += "XC";
      number -= 90;
    } else if (number >= 50) {
      output.textContent += "L";
      number -= 50;
    } else if (number >= 40) {
      output.textContent += "XL";
      number -= 40;
    } else if (number >= 10) {
      output.textContent += "X";
      number -= 10;
    } else if (number >= 9) {
      output.textContent += "IX";
      number -= 9;
    } else if (number >= 5) {
      output.textContent += "V";
      number -= 5;
    } else if (number >= 4) {
      output.textContent += "IV";
      number -= 4;
    } else {
      output.textContent += "I";
      number -= 1;
    }
  }
};

const reset = () => {
  input.value = "";
};

const outputDisplay = () => {
  output.classList.remove("hidden");
  output.classList.add("box");
};
