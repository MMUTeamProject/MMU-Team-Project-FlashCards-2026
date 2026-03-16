let loadedStacks = [];
let currentEditingStack = null;

// Load stacks from localStorage
function loadStacks() {
  try {
    const raw = localStorage.getItem("flashcardStacks");

    if (!raw) {
      alert("No stacks found in local storage.");
      return;
    }

    loadedStacks = JSON.parse(raw).map(s => ({
      name: s.stackName,
      cards: s.cards
    }));

    displayStacks(loadedStacks);

  } catch (error) {
    console.error("Error loading stacks:", error);
  }
}

// Display stacks in the table
function displayStacks(stacks) {
  const table = document.getElementById("stackTable");

  table.innerHTML = `
    <tr>
      <th>Stack name</th>
      <th>Number of Cards</th>
      <th>View</th>
    </tr>
  `;

  stacks.forEach(stack => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${stack.name}</td>
      <td>${stack.cards.length}</td>
      <td><button onclick="viewStack('${stack.name}')">View</button></td>
    `;

    row.style.cursor = "pointer";
    row.onclick = (event) => {
      if (event.target.tagName !== "BUTTON") { 
        localStorage.setItem("selectedStack", stack.name);
        window.location.href = "revisionpage.html";
      }
    };

    table.appendChild(row);
  });
}

// Show stack contents in a text box
function viewStack(stackName) {
  const stack = loadedStacks.find(s => s.name === stackName);
  currentEditingStack = stack;

  let text = "";

  stack.cards.forEach((card, i) => {
    text += `Q${i+1}: ${card.question}\n`;
    text += `A${i+1}: ${card.answer}\n\n`;
  });

  const viewer = document.getElementById("viewer");
  const viewerText = document.getElementById("viewerText");

  viewerText.value = text;
  viewerText.readOnly = true;

  viewer.style.display = "block";

  // Show edit button
  document.getElementById("editBtn").style.display = "inline-block";
  document.getElementById("saveBtn").style.display = "none";
}

// Enable editing mode
function enableEditing() {
  const viewerText = document.getElementById("viewerText");

  viewerText.readOnly = false;

  document.getElementById("editBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "inline-block";
}

// Save edited stack back to localStorage
function saveEditedStack() {
  const viewerText = document.getElementById("viewerText").value;

  const lines = viewerText.split("\n").filter(l => l.trim() !== "");

  const newCards = [];

  for (let i = 0; i < lines.length; i += 2) {
    const qLine = lines[i];
    const aLine = lines[i + 1];

    if (!qLine || !aLine) continue;

    const question = qLine.replace(/^Q\d+:\s*/, "");
    const answer = aLine.replace(/^A\d+:\s*/, "");

    newCards.push({ question, answer });
  }

  currentEditingStack.cards = newCards;

  // Convert back to original storage format
  const toStore = loadedStacks.map(s => ({
    stackName: s.name,
    cards: s.cards
  }));

  localStorage.setItem("flashcardStacks", JSON.stringify(toStore));

  alert("Stack updated successfully!");

  // Lock editing again
  document.getElementById("viewerText").readOnly = true;
  document.getElementById("editBtn").style.display = "inline-block";
  document.getElementById("saveBtn").style.display = "none";
}
