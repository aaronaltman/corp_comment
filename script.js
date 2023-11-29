// -- Global Variables --
const textAreaEl = document.querySelector(".form__textarea");
const formEl = document.querySelector(".form");
const submitButtonEl = document.querySelector(".submit-btn");
const counterEl = document.querySelector(".counter");
const listEl = document.querySelector(".feedbacks");
const spinnerEl = document.querySelector(".spinner");

// -- Constants --
MAX_CHARS = 150;

// -- Refactor the feedback HTML --
const renderFeedbackHTML = (feedbackItem) => {
  const feedbackItemHTML = `<li class="feedback">
    <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
      <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
      <p class="feedback__company">${feedbackItem.company}</p>
      <p class="feedback__text">
        ${feedbackItem.text}
      </p>
    </div>
    <p class="feedback__date">${
      feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
    }</p>
  </li>`;
};

// -- Counter Component (150) --
// -- Counts the number of characters and subtracts from counter --
const inputHandler = () => {
  const text = textAreaEl.value;
  const textLength = text.length;
  const charsLeft = MAX_CHARS - textLength;
  counterEl.textContent = charsLeft;
};
// input event listener - then execute the inputHandler function
textAreaEl.addEventListener("input", inputHandler);

// refactoring the form validation
const showVisualIndicator = (textcheck) => {
  const className = textcheck === "valid" ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  // Set timeout for form class removal
  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
};

// -- Form Component --
// -- Submit Button Logic --
const submitHandler = (event) => {
  event.preventDefault();
  const text = textAreaEl.value;
  const textLength = text.length;
  // validate text length and hashtag
  if (textLength >= 5 && text.includes("#")) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
  }

  // Constants for adding a list item
  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const companyName = hashtag.slice(1);
  const badgeLetter = companyName.substring(0, 1).toUpperCase();
  const upvote = 0;
  let daysAgo = 0;

  // New Feedback Item Object
  const feedbackItem = {
    upvoteCount: upvote,
    badgeLetter: badgeLetter,
    company: companyName,
    text: text,
    daysAgo: daysAgo,
  };

  // render the feedback item
  renderFeedbackHTML(feedbackItem);
  // -- Add the FeedbackItem HTML Object to the DOM --
  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

  // -- Clear the text area --
  textAreaEl.value = "";
  // -- button blur --
  submitButtonEl.blur();
  // -- Reset the counter --
  counterEl.textContent = MAX_CHARS;
};

// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// Add a list item once form submitted

// Retrieve the data from the server
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((response) => response.json())
  .then((data) => {
    // Remove the Spinner loading icon
    spinnerEl.remove();
    // iterate over the data and add a list item for each item in the array
    data.feedbacks.forEach((feedbackItem) => {
      // render the feedback item
      renderFeedbackHTML(feedbackItem);

      // Add the FeedbackItem HTML Object to the DOM
      listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
    });
  })
  .catch((error) => {
    listEl.textContent = "Error loading feedbacks";
    console.log(error);
  });

// Display the data on the page
