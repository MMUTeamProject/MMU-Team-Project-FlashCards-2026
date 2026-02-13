const cards = [
  { question: "Question text 1?", answer: "Answer text 1" },
  { question: "Question text 2?", answer: "Answer text 2" }
];

let index = 0;
let displayAnswer = false;

function showCard() {
  const card = cards[index];
  document.getElementById("card").innerText =
    displayAnswer ? card.answer : card.question;
}

document.getElementById("card").addEventListener("click", () => {
  displayAnswer = !displayAnswer;
  showCard();
});

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % cards.length;
  displayAnswer = false;
  showCard();
});

showCard();


