// api/index.js
const serverless = require("serverless-http");
const app = require("../app"); // load your Express app

module.exports = serverless(app);
