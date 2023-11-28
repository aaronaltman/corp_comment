// Global Variables
const textAreaEl = document.querySelector(".form__textarea");
const formEl = document.querySelector(".form");
const submitButtonEl = document.querySelector(".submit-btn");
const counterEl = document.querySelector(".counter");
MAX_CHARS = 150;

// Counter Component
// InputHandler function
const inputHandler = () => {
  const text = textAreaEl.value;
  const textLength = text.length;
  let charsLeft = MAX_CHARS - textLength;
  // Counter needs to count down as characters are added
  counterEl.textContent = charsLeft;
};
// input event listener - then execute the inputHandler function
textAreaEl.addEventListener("input", inputHandler);

// Submit Button
const submitHandler = (event) => {
  event.preventDefault();
  console.log("submitted");
};
// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// Log the data to the server

// Retrieve the data from the server
