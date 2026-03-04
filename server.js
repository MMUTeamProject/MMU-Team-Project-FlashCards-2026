const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const DATA_FILE = "stacks.json";


// When a user saves a stack, store it in stacks.json
app.post("/saveStack", (req, res) => {

    const { stackName, cards } = req.body;

    let stacks = [];

    // If the file already exists, read the existing stacks first
    if (fs.existsSync(DATA_FILE)) {
        stacks = JSON.parse(fs.readFileSync(DATA_FILE));
    }

    stacks.push({ stackName, cards });

    // Write everything back into the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(stacks, null, 2));

    res.json({ message: "Stack saved successfully!" });
});


// When the frontend asks for stacks, send them all
app.get("/getStacks", (req, res) => {

    // If no file yet, just send an empty list
    if (!fs.existsSync(DATA_FILE)) {
        return res.json([]);
    }

    const stacks = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(stacks);
});


app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
