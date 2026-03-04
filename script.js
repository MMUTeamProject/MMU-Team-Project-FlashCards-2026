
let cards = [];
let index = 0;
let displayAnswer = false;

const cardElement = document.getElementById("card");
const nextButton = document.getElementById("next");

// Get stack name from the URL
function getStackNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("stack");
}

// Load the stack from server
async function loadStack() {

  const stackName = getStackNameFromURL();

  if (!stackName) {
    cardElement.innerText = "No stack selected.";
    return;
  }

  const response = await fetch("/getStacks");
  const stacks = await response.json();

  // Find the correct stack
  const selectedStack = stacks.find(s => s.stackName === stackName);

  if (!selectedStack) {
    cardElement.innerText = "Stack not found.";
    return;
  }

  cards = selectedStack.cards;

  if (cards.length === 0) {
    cardElement.innerText = "This stack has no cards.";
    return;
  }

  showCard();
}

function showCard() {
  const card = cards[index];
  cardElement.innerText =
    displayAnswer ? card.answer : card.question;
}

// Click to flip
cardElement.addEventListener("click", () => {
  displayAnswer = !displayAnswer;
  showCard();
});

// Next button
nextButton.addEventListener("click", () => {
  if (cards.length === 0) return;

  index = (index + 1) % cards.length;
  displayAnswer = false;
  showCard();
});

// Load stack when page loads
loadStack();
