const btn = document.getElementById('convert-btn');
const userNumber = document.getElementById('number');
const output = document.getElementById('output');

function romanConverter(number) {
  if (number === '') {
    output.innerHTML = 'Please enter a valid number';
    return;
  }
  else if (number <= 0) {
    output.innerHTML = 'Please enter a number greater than or equal to 1';
  }
  else if (number > 3999) {
    output.innerHTML = 'Please enter a number less than or equal to 3999';
  }
  else {
    output.innerHTML = '';
    while (number > 0) {
      if (number >= 1000) {
        output.innerHTML += 'M';
        number -= 1000;
      }
      else if (number >= 900) {
        output.innerHTML += 'CM';
        number -= 900;
      }
      else if (number >= 500) {
        output.innerHTML += 'D';
        number -= 500;
      }
      else if (number >= 400) {
        output.innerHTML += 'CD';
        number -= 400;
      }
      else if (number >= 100) {
        output.innerHTML += 'C';
        number -= 100;
      }
      else if (number >= 90) {
        output.innerHTML += 'XC';
        number -= 90;
      }
      else if (number >= 50) {
        output.innerHTML += 'L';
        number -= 50;
      }
      else if (number >= 40) {
        output.innerHTML += 'XL';
        number -= 40;
      }
      else if (number >= 10) {
        output.innerHTML += 'X';
        number -= 10;
      }
      else if (number >= 9) {
        output.innerHTML += 'IX';
        number -= 9;
      }
      else if (number >= 5) {
        output.innerHTML += 'V';
        number -= 5;
      }
      else if (number >= 4) {
        output.innerHTML += 'IV';
        number -= 4;
      }
      else {
        output.innerHTML += 'I';
        number -= 1;
      }
    }
  }
};

btn.addEventListener('click', () => {
  romanConverter(userNumber.value);
  userNumber.value = '';
});

userNumber.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    romanConverter(userNumber.value);
    userNumber.value = '';
  }
});