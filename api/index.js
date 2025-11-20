// const serverless = require("serverless-http");
// const app = require("../server");

// const handler = serverless(app);

// module.exports = async (req, res) => {
//     return handler(req, res);
// };



const serverless = require("serverless-http");
const app = require("../app");
module.exports = serverless(app);
