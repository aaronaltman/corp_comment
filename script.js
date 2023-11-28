// -- Global Variables --
const textAreaEl = document.querySelector(".form__textarea");
const formEl = document.querySelector(".form");
const submitButtonEl = document.querySelector(".submit-btn");
const counterEl = document.querySelector(".counter");
const listEl = document.querySelector(".feedbacks");
// -- Constants --
MAX_CHARS = 150;

// -- Counter Component (150) --
// -- Counts the number of characters in the text area --
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
  // validate text
  if (textLength >= 6 && text.includes("#")) {
    formEl.classList.add("form--valid");
    // Set timeout for form class removal
    setTimeout(() => {
      formEl.classList.remove("form--valid");
    }, 2000);
  } else {
    formEl.classList.add("form--invalid");
    // Set timeout for form class removal
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 2000);
  }
  // Constants for adding a list item
  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const companyName = hashtag.slice(1);
  const badgeLetter = companyName.substring(0, 1).toUpperCase();
  const upvote = 0;
  const daysAgo = 0;

  // -- Create the FeedbackItem HTML Object --
  const feedbackItemHTML = `<li class="feedback">
    <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${upvote}</span>
    </button>
    <section class="feedback__badge">
      <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
      <p class="feedback__company">${companyName}</p>
      <p class="feedback__text">
        ${text}
      </p>
    </div>
    <p class="feedback__date">${daysAgo}</p>
  </li>`;
  // -- Add the FeedbackItem HTML Object to the DOM --
  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};
// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// Add a list item once form submitted

// Retrieve the data from the server

// Display the data on the page
