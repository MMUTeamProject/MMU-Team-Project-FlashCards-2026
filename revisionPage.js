// EVERYTHING goes inside this function now
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SETUP VARIABLES (Moved inside here) ---
    let allStacks = JSON.parse(localStorage.getItem("flashcardStacks") || "[]");

    // 2. Get the NAME of the stack you clicked on the previous page
    const selectedStackName = localStorage.getItem("selectedStack");

    // 3. Find the specific stack that matches that name
    const stackToLoad = allStacks.find(s => s.stackName === selectedStackName);

    // 4. Set your variables based on THAT stack
    let currentStack = stackToLoad ? stackToLoad.cards : []
    let index = 0;

    // Update the Title to match the stack name
    const stackTitle = document.getElementById("stack-title");
    if (stackTitle) stackTitle.textContent = selectedStackName || "Revision";

    const questionP = document.getElementById("display-question");
    const answerP = document.getElementById("display-answer");
    const counterText = document.getElementById("counter");
    const cardInner = document.getElementById("card-inner");
    const cardContainer = document.getElementById("card-container");

    // --- 2. UPDATE FUNCTION ---
    function updateCardUI() {
        if (currentStack.length === 0) {
            questionP.textContent = "No cards found!";
            return;
        }
        
        // Reset flip state when moving to next card
        cardInner.classList.remove('is-flipped');
        
        questionP.textContent = currentStack[index].question;
        answerP.textContent = currentStack[index].answer;
        counterText.textContent = `Card ${index + 1} of ${currentStack.length}`;
    }

    // --- 3. EVENT LISTENERS (Moved inside here) ---
    
    // This is what makes the card flip on click
  if (cardContainer) {
    cardContainer.addEventListener("click", () => {
        console.log("CLICKED! Class is being toggled now."); // <--- ADD THIS
        cardInner.classList.toggle('is-flipped');
    });
}
    // Next Button
    document.getElementById("next-btn").addEventListener("click", (e) => {
        e.stopPropagation(); // Stops the card from flipping when you click "Next"
        index = (index + 1) % currentStack.length;
        updateCardUI();
    });

    // Previous Button
    document.getElementById("prev-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        index = (index - 1 + currentStack.length) % currentStack.length;
        updateCardUI();
    });

    // --- 4. INITIAL START ---
    updateCardUI();
})

