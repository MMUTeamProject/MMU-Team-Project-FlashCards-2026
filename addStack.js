let cards = [];
let questionBox = document.getElementById("question");
let answerBox = document.getElementById("answer");
let counter = document.getElementById("counter");
let stackNameBox = document.getElementById("Stack-Name");
let index = 0;

const isInputValid = () => questionBox.value.trim() !== "" && answerBox.value.trim() !== "";

function addCard() {
    let questionText = questionBox.value;
    let answerText = answerBox.value;
    cards.push({ question: questionText, answer: answerText });
}

function updateCard() {
    let questionText = questionBox.value;
    let answerText = answerBox.value;
    cards[index] = { question: questionText, answer: answerText };
}

function displayCard() {
    if (cards.length < index + 1) {
        questionBox.value = "";
        answerBox.value = "";
        counter.innerText = "Card " + (index + 1).toString();
        return;
    }
    questionBox.value = cards[index].question;
    answerBox.value = cards[index].answer;
    counter.innerText = "Card " + (index + 1).toString();
}

function nextCardButton() {
    if (!isInputValid()) return alert("Please complete the current card before proceeding.");
    index >= cards.length ? addCard() : updateCard();
    index++;
    displayCard();
}

function prevCardButton() {
    if (index <= 0) return;
    updateCard();
    index -= 1;
    displayCard();
}

// Function to view saved data in console
function loadStacks() {
    const saved = JSON.parse(localStorage.getItem("flashcardStacks") || "[]");
    console.log("Saved Stacks:", saved);
    return saved;
}

document.getElementById("flashCardForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (isInputValid()) {
        index >= cards.length ? addCard() : updateCard();
    }

    let stackName = stackNameBox.value.trim();
    if (!stackName || cards.length === 0) {
        alert("Please provide a stack name and ensure at least one card is completed.");
        return;
    }

    // Save to LocalStorage
    try {
        const existingStacks = JSON.parse(localStorage.getItem("flashcardStacks") || "[]");
        existingStacks.push({ stackName, cards });
        localStorage.setItem("flashcardStacks", JSON.stringify(existingStacks));
        
        alert("Stack '" + stackName + "' saved successfully to browser storage!");
        
        // Reset for new stack
        cards = [];
        index = 0;
        stackNameBox.value = "";
        displayCard();
    } catch (err) {
        alert("Error saving to local storage.");
    }

});