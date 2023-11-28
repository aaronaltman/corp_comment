// -- Global Variables --
const textAreaEl = document.querySelector(".form__textarea");
const formEl = document.querySelector(".form");
const submitButtonEl = document.querySelector(".submit-btn");
const counterEl = document.querySelector(".counter");
MAX_CHARS = 150;

// Counter Component - counts the number of characters in the text area
const inputHandler = () => {
  const text = textAreaEl.value;
  const textLength = text.length;
  const charsLeft = MAX_CHARS - textLength;
  counterEl.textContent = charsLeft;
};
// input event listener - then execute the inputHandler function
textAreaEl.addEventListener("input", inputHandler);

// Submit Button
const submitHandler = (event) => {
  event.preventDefault();
  const text = textAreaEl.value;
  console.log(text);
};
// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// Log the data to the server

// Retrieve the data from the server

// Display the data on the page
