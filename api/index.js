// api/index.js
const serverless = require("serverless-http");

let app;

try {
    // try importing your Express app
    app = require("./server");
} catch (err) {
    console.error("Failed to load server:", err);
    app = require("express")(); // fallback: empty Express app
    app.get("/", (req, res) => res.status(500).send("Server failed to load."));
}

module.exports = serverless(app);
