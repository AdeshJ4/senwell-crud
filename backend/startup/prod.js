const config = require("config");
const cors = require("cors");

module.exports = function (app) {
  if (config.get("NODE_ENV") === "production") {
    app.use(cors());
    console.log("cors is enabled.");
  }
};
