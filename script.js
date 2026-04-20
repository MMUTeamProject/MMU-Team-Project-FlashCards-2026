

function initializeDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const htmlElement = document.documentElement;
    
    if (!darkModeBtn) return; // Exit if dark mode button doesn't exist
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    darkModeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDarkMode);
} else {
    initializeDarkMode();
}


let revisionCards = [];
let revisionIndex = 0;
let revisionDisplayAnswer = false;

const cardElement = document.getElementById("card");
const nextButton = document.getElementById("next");

// Get stack name from the URL
function getStackNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("stack");
}

// Load the stack from localStorage
function loadStack() {

  const stackName = getStackNameFromURL();

  if (!stackName) {
    cardElement.innerText = "No stack selected.";
    return;
  }

  const stacks = JSON.parse(localStorage.getItem("flashcardStacks") || "[]");

  // Find the correct stack
  const selectedStack = stacks.find(s => s.stackName === stackName);

  if (!selectedStack) {
    cardElement.innerText = "Stack not found.";
    return;
  }

  revisionCards = selectedStack.cards;

  if (revisionCards.length === 0) {
    cardElement.innerText = "This stack has no cards.";
    return;
  }

  showCard();
}

function showCard() {
  const card = revisionCards[revisionIndex];
  cardElement.innerText =
    revisionDisplayAnswer ? card.answer : card.question;
}

// Click to flip
if (cardElement) {
  cardElement.addEventListener("click", () => {
    revisionDisplayAnswer = !revisionDisplayAnswer;
    showCard();
  });
}

// Next button
if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (revisionCards.length === 0) return;

    revisionIndex = (revisionIndex + 1) % revisionCards.length;
    revisionDisplayAnswer = false;
    showCard();
  });
}

// Load stack when page loads
loadStack();
