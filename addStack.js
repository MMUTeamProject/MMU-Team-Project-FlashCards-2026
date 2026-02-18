let cards = []
let questionBox = document.getElementById("question");
let answerBox = document.getElementById("answer");
let counter = document.getElementById("counter");
let stackNameBox = document.getElementById("Stack-Name");
let index = 0
const isInputValid = () => questionBox.value.trim() !== "" && answerBox.value.trim() !== "";


function addCard() {
    let questionText = questionBox.value
    let answerText = answerBox.value
    cards.push({ question: questionText, answer: answerText })
}

function updateCard() {
    let questionText = questionBox.value
    let answerText = answerBox.value
    cards[index] = { question: questionText, answer: answerText }
}

function displayCard() {
    if (cards.length < index + 1) {
        questionBox.value = ""
        answerBox.value = ""
        counter.innerText = "Card " + (index + 1).toString()
        return
    }
    questionBox.value = cards[index].question
    answerBox.value = cards[index].answer
    counter.innerText = "Card " + (index + 1).toString()

    let message = ""
    for (let i = 0; i < cards.length; i++) {
        message += "\n" + (cards[i].question).toString() + "| " + (cards[i].answer).toString()
    }
    //alert(message)
}

function nextCardButton() {
  if (!isInputValid()) return alert("Please complete the current card before proceeding.");
  
    if (cards.length < index) {
        addCard()
    } else {
        updateCard()
    }
    index += 1
    displayCard()
}

function prevCardButton() {
    if (index <= 0) return
    updateCard()
    index -= 1
    displayCard()
}

// save the stack to the server when the form is submitted

document.getElementById("flashCardForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // gets stacks data if "Complete" button is pressed


    if (cards.length < index + 1) {
        addCard();
    } else {
        updateCard();
    }

    let stackName = stackNameBox.value;

    
    if (!stackName || cards.length == 0) {  // Notify if the stack is empty
        alert("Please enter a stack name and at least one card.");
        return;
    }

    try {    // Sends the stack data to the server
        let res = await fetch("/saveStack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stackName: stackName,
                cards: cards
            })
        });

        let data = await res.json();

        alert(data.message); // notification if saved successfully

    } catch (err) {

        console.log("something went wrong while saving", err);
        alert("Could not save stack.");

    }

});
