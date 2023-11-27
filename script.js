// Global variables
const MAX_CHARS = 150;

const buttonEl = document.querySelector(".submit-btn");
const inputEl = document.querySelector(".form__textarea");
const listEl = document.querySelector(".feedbacks");
const formEl = document.querySelector(".form");
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const spinnerEl = document.querySelector(".spinner");
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

//create feedback item object
  const feedbackItem = {
    inputValue: inputValue,
    company: company,
    badgeLetter: badgeLetter,
    upVote: upVote,
    daysAgo: daysAgo,
    text: inputValue,
  };

// render feedback item
const renderFeedbackItem = feedbackItem => {
   const feedbackItemHTML = `
 <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${feedbackItem.upVote}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${inputValue}</p>
    </div>
    <p class="feedback__date">${feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
</li>
  `;
  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

};

// Input Handler -- Counter -- 
const inputHandler = () => {
  const maxCharacters = MAX_CHARS;
  const currentCharacters = textareaEl.value.length;
  const remainingCharacters = maxCharacters - currentCharacters;
  counterEl.textContent = remainingCharacters;
};

textareaEl.addEventListener("input", inputHandler);

// Form Handler --
const formValidation = textCheck => {
  const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
  formEl.classList.add(className);
    setTimeout(() => {
      formEl.classList.remove(className);
    }, 2000);

}
const buttonHandler = (event) => {
  // Prevent default behavior
  event.preventDefault();
  const inputValue = inputEl.value;

  if (inputValue.includes("#") && inputValue.length >= 5) {
    formValidation('valid');
  } else {
    formValidation('invalid');
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
  renderFeedbackItem(feedbackItem);
 
  // Clear textarea
  inputEl.value = "";
  // Reset counter
  counterEl.textContent = MAX_CHARS;
  // Reset button
  buttonEl.blur() = true;
};

formEl.addEventListener("submit", buttonHandler);

// send feedback to server
fetch(`${BASE_API_URL}/feedbacks`, {
  method: 'POST',
  body: JSON.stringify(feedbackItem),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
// Click Handler --
const clickHandler = () => {
  console.log('hello')
}
// Upvote Handler --
listEl.addEventListener("click", clickHandler);

// Feedback List Component --
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => response.json())
.then(data => {
  //
  spinnerEl.remove();
// iterate over data.feedbacks
data.feedbacks.forEach(feedbackItem => {
  // Create new list item
  renderFeedbackItem(feedbackItem);
  });
}).catch(error => {
  console.log(error);
});

