let loadedStacks = [];

// Load stacks from localStorage (using the correct key)
function loadStacks() {
  try {
    const raw = localStorage.getItem("flashcardStacks");

    if (!raw) {
      alert("No stacks found in local storage.");
      return;
    }

    // Parse stored JSON
    loadedStacks = JSON.parse(raw);

    // Convert to your internal format (name → stackName)
    const converted = loadedStacks.map(s => ({
      name: s.stackName,
      cards: s.cards
    }));

    loadedStacks = converted;

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

    // Clicking the row loads revisionpage.html
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

  let text = `Stack: ${stack.name}\n\n`;

  stack.cards.forEach((card, i) => {
    text += `Q${i+1}: ${card.question}\n`;
    text += `A${i+1}: ${card.answer}\n\n`;
  });

  document.getElementById("viewerText").value = text;
  document.getElementById("viewer").style.display = "block";
}
