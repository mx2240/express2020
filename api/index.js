// api/index.js
const serverless = require("serverless-http");
const app = require("../server");   // <-- load your existing Express app

module.exports = serverless(app);
