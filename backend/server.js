const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

require("./startup/dbConnection")();
require("./startup/config")();
require("./startup/prod")(app);
require("./startup/routes")(app);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});