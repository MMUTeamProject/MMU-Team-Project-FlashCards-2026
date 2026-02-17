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

// save the stack to the server when the form is submitted

document.getElementById("flashCardForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // gets stacks data if "Complete" button is pressed


    if (cards.length < index + 1) {
        addCard();
    } else {
        updateCard();
    }

    var stackName = stackNameBox.value;

    
    if (!stackName || cards.length == 0) {  // Notify if the stack is empty
        alert("Please enter a stack name and at least one card.");
        return;
    }

    try {    // Sends the stack data to the server
        var res = await fetch("/saveStack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stackName: stackName,
                cards: cards
            })
        });

        var data = await res.json();

        alert(data.message); // notification if saved successfully

    } catch (err) {

        console.log("something went wrong while saving", err);
        alert("Could not save stack.");

    }

});
