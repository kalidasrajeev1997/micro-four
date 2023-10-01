const array = ["1", "-", "1"];

const numbers = [];
let operator = [];

array.forEach((item) => {
  if (!isNaN(item) || (item[0] === "-" && typeof item.slice(1) === "number")) {
    console.log(!isNaN(item.slice(1)));
    numbers.push(parseFloat(item));
  } else if (["+", "-", "*", "/"].includes(item)) {
    operator.push(item);
  }
});

console.log(numbers);
console.log(operator);

// const filteredNumbers = numbers.filter((n) => !isNaN(n));
// console.log(filteredNumbers);

if (operator.length === numbers.length) {
  operator = operator.slice(0, operator.length - 1);
}

const calcuation = operator.reduce((p, _value, index) => {
  const operatorIndex = operator[index];
  const number = numbers[index + 1];
  console.log(number);
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

console.log(calcuation);

// const array = "-1 , -, 1.23";

// // Use regular expressions to split the string by commas and spaces, and then map to convert to numbers
// const numbers = array.split(/,\s*/).map((n) => {
//   // Use a regular expression to match numeric values, including negative numbers and decimal points
//   const numericValue = n.match(/-?\d+(\.\d+)?/);

//   // If a numeric value is found, convert it to a number; otherwise, return NaN
//   return numericValue ? Number(numericValue[0]) : NaN;
// });

// console.log(numbers); // Output: [-1, NaN, 1.23]

// // Filter out NaN values to get the final result [-1, 1.23]
// const filteredNumbers = numbers.filter((n) => !isNaN(n));

// console.log(filteredNumbers); // Output: [-1, 1.23]
