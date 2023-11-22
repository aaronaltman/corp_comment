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
    return;
  }
  // Get info to Create new list item --
  const hashtag = inputValue
    .split(" ")
    .find((word) => word.includes("#"))
    .replace("#", "");
  const company = hashtag.split(0);
  const badgeLetter = hashtag.substring(0, 1).toUpperCase();
  const upVote = 0;
  const daysAgo = 0;

  // Create new list item
  const feedbackItemHTML = `
 <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upVote}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${inputValue}</p>
    </div>
    <p class="feedback__date">${daysAgo}</p>
</li>
  `;
  listEl.innerHTML = feedbackItemHTML;
};

formEl.addEventListener("submit", buttonHandler);
