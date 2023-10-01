const numbersButton = document.querySelectorAll(".numbers");
const operatorsButton = document.querySelectorAll(".operators");
const input = document.querySelector("#display");
const equal = document.querySelector("#equal");
const del = document.querySelector("#delete");
let valuesArray = ["0"];
const maxDecimals = 10;

function limitDecimals(number, maxDecimals) {
  const strNumber = number.toString();
  const parts = strNumber.split(".");

  if (parts.length === 2) {
    const integerPart = parts[0];
    const decimalPart = parts[1].substring(0, maxDecimals);

    return parseFloat(`${integerPart}.${decimalPart}`);
  } else {
    return number;
  }
}

function containsAlphabets(inputString) {
  const regex = /[a-zA-Z]/;
  return regex.test(inputString);
}

function countPeriods(inputString) {
  return inputString.split("").reduce((count, char) => {
    if (char === ".") {
      return count + 1;
    }
    return count;
  }, 0);
}

function performBackspace() {
  if (valuesArray.length > 0) {
    valuesArray[valuesArray.length - 1] = valuesArray[
      valuesArray.length - 1
    ].slice(0, -1);
    if (valuesArray[valuesArray.length - 1] === "") {
      valuesArray.pop();
    }
  }
}

numbersButton.forEach((element) => {
  element.addEventListener("click", function () {
    const number = this.getAttribute("data-number");
    const index = valuesArray.length - 1;
    let currentEntry = valuesArray[index];

    if (
      ["+", "-", "*", "÷"].includes(valuesArray[index - 1]) &&
      valuesArray[index] === "-"
    ) {
      valuesArray[index] = currentEntry.concat(number);
      input.value = input.value.concat(number);
      return;
    }

    if (currentEntry && currentEntry.startsWith(".")) {
      currentEntry = `0${currentEntry}`;
    }

    if (!isNaN(currentEntry)) {
      if (number === ".") {
        const count = countPeriods(currentEntry);
        if (count > 0) return;
      }
      valuesArray[index] = currentEntry.concat(number);
    } else {
      valuesArray.push(number);
    }
    if (input.value === "0") {
      input.value = number;
      return;
    }
    input.value = input.value.concat(number);
  });
});

operatorsButton.forEach((element) => {
  element.addEventListener("click", function () {
    const operator = this.getAttribute("data-operator");
    const index = valuesArray.length - 1;
    const currentEntry = valuesArray[index];

    if (operator === "-" && !["-", "+"].includes(valuesArray[index])) {
      valuesArray.push("-");
      input.value = input.value.concat("-");
      return;
    }
    if (!isNaN(currentEntry)) {
      if (currentEntry === ".") {
        return;
      }
      valuesArray.push(operator);
      input.value = input.value.concat(operator);
    }
  });
});

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  valuesArray.length = 0;
  valuesArray.push("0");
  input.value = 0;
});

equal.addEventListener("click", function () {
  const mappedValues = valuesArray.map((v) => {
    return v === "." ? "0.0" : v;
  });
  if (!mappedValues.length) return;

  const numbers = [];
  let operator = [];

  mappedValues.forEach((item) => {
    if (
      !isNaN(item) ||
      (item[0] === "-" && typeof item.slice(1) === "number")
    ) {
      numbers.push(parseFloat(item));
    } else if (["+", "-", "*", "÷"].includes(item)) {
      if (item === "÷") operator.push("/");
      else operator.push(item);
    }
  });

  if (numbers.length < 2) return;

  if (operator.length === numbers.length) {
    operator = operator.slice(0, operator.length - 1);
  }

  const calcuation = operator.reduce((p, _value, index) => {
    const operatorIndex = operator[index];
    const number = numbers[index + 1];
    if (operatorIndex === "+") {
      return (p = p + number);
    }
    if (operatorIndex === "*") {
      return (p = p * number);
    }
    if (operatorIndex === "/") {
      return (p = p / number);
    }
    if (operatorIndex === "-") {
      return (p = p - number);
    }
  }, numbers[0]);

  if (isNaN(calcuation)) {
    input.value = "Error";
  } else {
    valuesArray.length = 0;
    valuesArray.push(String(calcuation));
    input.value = limitDecimals(calcuation, 10);
  }
});

del.addEventListener("click", function () {
  if (input.value.slice(0, -1).length && !containsAlphabets(input.value)) {
    performBackspace();
    input.value = input.value.slice(0, -1);
  } else {
    valuesArray.length = 0;
    valuesArray.push("0");
    input.value = 0;
  }
});
