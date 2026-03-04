let cards = [], index = 0;
const questionBox = document.getElementById("question");
const answerBox = document.getElementById("answer");
const counter = document.getElementById("counter");
const stackNameBox = document.getElementById("Stack-Name");

const isInputValid = () => questionBox.value.trim() && answerBox.value.trim();

function saveCurrentState() {
    if (isInputValid()) {
        const cardData = { question: questionBox.value, answer: answerBox.value };
        index < cards.length ? cards[index] = cardData : cards.push(cardData);
    }
}

function displayCard() {
    const card = cards[index] || { question: "", answer: "" };
    questionBox.value = card.question;
    answerBox.value = card.answer;
    counter.innerText = `Card ${index + 1}`;
}

function nextCardButton() {
    if (!isInputValid()) return alert("Please complete the current card.");
    saveCurrentState();
    index++;
    displayCard();
}

function prevCardButton() {
    if (index > 0) {
        saveCurrentState();
        index--;
        displayCard();
    }
}

document.getElementById("flashCardForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveCurrentState();
    const stackName = stackNameBox.value.trim();

    if (!stackName || !cards.length) return alert("Enter a stack name and at least one card.");

    const existing = JSON.parse(localStorage.getItem("flashcardStacks") || "[]");
    existing.push({ stackName, cards });
    localStorage.setItem("flashcardStacks", JSON.stringify(existing));

    alert(`Stack '${stackName}' saved!`);
    location.reload(); // Quickest way to reset the entire state
});