const minValue = -5;
const maxValue = 5;

const counterOutput = document.querySelector(".Counter-output");


const counterDecrement = document.querySelector(".Counter-decrement");
counterDecrement.addEventListener("click", () => {
  const currentValue = Number(counterOutput.value);
  const value = Math.max(minValue, currentValue - 1);

  counterOutput.value = value;
});


const counterIncrement = document.querySelector(".Counter-increment");
counterIncrement.addEventListener("click", () => {
  const currentValue = Number(counterOutput.value);
  const value = Math.min(maxValue, currentValue + 1);

  counterOutput.value = value;
});
