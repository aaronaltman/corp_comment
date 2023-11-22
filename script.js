// Global variables
const buttonEl = document.querySelector(".submit-btn");
const inputEl = document.querySelector(".form__textarea");
const listEl = document.querySelector(".feedbacks");
const formEl = document.querySelector(".form");
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");

// Create a new list item --- inputHandler
const inputHandler = () => {
  // Determine maximum number of characters
  const maxCharacters = 150;
  // Determine number of characters in textarea
  const currentCharacters = textareaEl.value.length;
  // Determine number of characters remaining
  const remainingCharacters = maxCharacters - currentCharacters;
  // Update counter
  counterEl.textContent = remainingCharacters;
};

textareaEl.addEventListener("input", inputHandler);

// Create a new list item -- buttonHandler
const buttonHandler = (event) => {
  // Prevent default behavior
  event.preventDefault();
  const inputValue = inputEl.value;

  if (inputValue.includes("#") && inputValue.length >= 5) {
    formEl.classList.add("form--valid");
    setTimeout(() => {
      formEl.classList.remove("form--valid");
    }, 2000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 2000);
  }
};

formEl.addEventListener("submit", buttonHandler);
