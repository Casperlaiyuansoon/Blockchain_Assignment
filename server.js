const express = require("express");
const path = require("path");
const app = express();

// Serve the smart contract JSON file
app.use(express.static(path.join(__dirname, "/build/contracts")));

// Serve the frontend which under public folder (index.html and other html file)
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => console.log("backend running on port 3000"));
