// api/index.js
const serverless = require("serverless-http");
const app = require("../app");  // <-- loads your Express app

module.exports = serverless(app);
