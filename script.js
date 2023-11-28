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
  const textLength = text.length;
  const splitHashtags = text.split(" ");
  // validate text
  if (textLength >= 6 && text.includes("#")) {
    formEl.classList.add("form--valid");
  } else {
    formEl.classList.add("form--invalid");
  }
};
// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// Add a list item once form submitted

// Retrieve the data from the server

// Display the data on the page
