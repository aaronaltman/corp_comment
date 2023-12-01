// -- Global Variables --
const textAreaEl = document.querySelector(".form__textarea");
const formEl = document.querySelector(".form");
const submitButtonEl = document.querySelector(".submit-btn");
const counterEl = document.querySelector(".counter");
const listEl = document.querySelector(".feedbacks");
const hashtagListEl = document.querySelector(".hashtags");
const spinnerEl = document.querySelector(".spinner");
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

// -- Constants --
MAX_CHARS = 150;

// -- Refactor the feedback HTML --
const renderFeedbackItem = (feedbackItem) => {
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
  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};
// Counter COMPONENT
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
  renderFeedbackItem(feedbackItem);
  // -- Add the FeedbackItem HTML Object to the DOM --
  listEl.insertAdjacentHTML("beforeend", feedbackItem);

  // Send List Item to the Server
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // -- Clear the text area --
  textAreaEl.value = "";
  // -- button blur --
  submitButtonEl.blur();
  // -- Reset the counter --
  counterEl.textContent = MAX_CHARS;
};

// when clicked: log the input, store the input in a variable, and count the length of the input
formEl.addEventListener("submit", submitHandler);

// -- Expand list item functionatility --

const clickHandler = (event) => {
  // get the html element that was clicked
  const clickedEl = event.target;

  // determine if the clicked element was the upvote button or expansion
  const upvoteIntention = clickedEl.className.includes("upvote");
  if (upvoteIntention == true) {
    //get the upvote count
    const upvoteButtonEl = clickedEl.closest(".upvote");
    // increment the upvote count
    upvoteButtonEl.textContent++;

    console.log(upvoteButtonEl.textContent);

    // disable the button
    upvoteButtonEl.disabled = true;
  } else {
    // get feedback content
    clickedEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};
listEl.addEventListener("click", clickHandler);

// Retrieve the data from the server
fetch(`${BASE_API_URL}/feedbacks`)
  .then((response) => response.json())
  .then((data) => {
    // Remove the Spinner loading icon
    spinnerEl.remove();
    // iterate over the data and add a list item for each item in the array
    data.feedbacks.forEach((feedbackItem) => renderFeedbackItem(feedbackItem));
  })
  .catch((error) => {
    listEl.textContent = "Error loading feedbacks";
    console.log(error);
  });

// -- Hashtag Component --
const clickHandler2 = (event) => {
  // Get the clicked element
  const clickedEl = event.target;
  if (clickedEl.className == "hashtag") {
    const hashtagCompanyName = clickedEl.textContent
      .substring(1)
      .toLowerCase()
      .trim();
    listEl.childNodes.forEach((childNode) => {
      if (childNode.nodeType === 3) return;
      const companyNameFromList = childNode
        .querySelector(".feedback__company")
        .textContent.toLowerCase()
        .trim();
      if (hashtagCompanyName !== companyNameFromList) {
        childNode.remove();
      }
    });
  }
};

hashtagListEl.addEventListener("click", clickHandler2);
