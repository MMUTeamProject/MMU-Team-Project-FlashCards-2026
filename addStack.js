var cards = []
var questionBox = document.getElementById("question");
var answerBox = document.getElementById("answer");
var counter = document.getElementById("counter");
var stackNameBox = document.getElementById("Stack-Name");
var index = 0


function addCard() {
    var questionText = questionBox.value
    var answerText = answerBox.value
    cards.push({ question: questionText, answer: answerText })
}

function updateCard() {
    var questionText = questionBox.value
    var answerText = answerBox.value
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

    var message = ""
    for (let i = 0; i < cards.length; i++) {
        message += "\n" + (cards[i].question).toString() + "| " + (cards[i].answer).toString()
    }
    //alert(message)
}

function nextCardButton() {
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

// Saving stacks to local server

document.getElementById("flashCardForm").addEventListener("submit", async function(e){

    e.preventDefault();

    if (cards.length < index + 1) {
        addCard();
    } else {
        updateCard();
    }

    var stackName = stackNameBox.value;

    if (!stackName || cards.length === 0) {
        alert("Stack name or cards missing!");
        return;
    }

    try {
        const response = await fetch("/saveStack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stackName: stackName,
                cards: cards
            })
        });

        const result = await response.json();

        alert(result.message);

        window.location.href = "Home_Page.html";

    } catch (error) {
        alert("Error saving stack.");
        console.error(error);
    }

});