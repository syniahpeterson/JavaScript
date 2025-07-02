const input = document.getElementById("user-input");
const results = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

checkBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please provide a phone number");
  } else {
    phoneNumberValidator(input.value);
    results.classList.remove("hidden");
    results.classList.add("showing");
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value === "") {
      alert("Please provide a phone number");
    } else {
      phoneNumberValidator(input.value);
      results.classList.remove("hidden");
      results.classList.add("showing");
    }
  }
});

clearBtn.addEventListener("click", () => {
  results.textContent = "";
  results.classList.remove("showing");
  results.classList.add("hidden");
});

const phoneNumberValidator = (number) => {
  input.value = "";
  const phoneRegex =
    /^(?:\+?1[\s-]?)?(?:\([0-9]{3}\)|[0-9]{3})[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
  if (phoneRegex.test(number)) {
    const p = document.createElement("p");
    p.textContent = "Valid US number: " + number;
    p.style.color = "#10b981";
    results.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.textContent = "Invalid US number: " + number;
    p.style.color = "#ef4444";
    results.appendChild(p);
  }
};
