fetch("/getStacks")
.then(res => res.json())
.then(data => {

    const table = document.getElementById("stackTable");

    data.forEach(stack => {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        // make stack name clickable
        const link = document.createElement("a");
        link.href = `index.html?stack=${encodeURIComponent(stack.stackName)}`;
        link.innerText = stack.stackName;

        nameCell.appendChild(link);

        const countCell = document.createElement("td");
        countCell.innerText = stack.cards.length;

        row.appendChild(nameCell);
        row.appendChild(countCell);

        table.appendChild(row);
    });

})
.catch(error => {
    console.error("Error loading stacks:", error);
});


// get the stacks from server and put them in the table
fetch("/getStacks")
  .then(function(response) {
      return response.json();
  })
  .then(function(stacks) {

      var table = document.getElementById("stackTable");

      // go through each stack
      for (var i = 0; i < stacks.length; i++) {

          var stack = stacks[i];
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          var td2 = document.createElement("td");

          // make the stack name clickable
          var a = document.createElement("a");
          a.href = "index.html?stack=" + encodeURIComponent(stack.stackName);
          a.innerText = stack.stackName;

          td1.appendChild(a);

          // show number of cards
          td2.innerText = stack.cards.length;

          tr.appendChild(td1);
          tr.appendChild(td2);

          table.appendChild(tr);
      }

  })
  .catch(function(err) {
      console.log("couldn't load stacks", err);
  });
