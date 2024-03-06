const express = require("express");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const path = require("path");
const users = require("../routes/users");

module.exports = function (app) {
  console.log(`Application Name: ${config.get("name")}`);
  console.log(`NODE_ENV : ${config.get("NODE_ENV")}`);

  if (config.get("NODE_ENV") === "development") {
    app.use(morgan("tiny"));
    app.use(cors());
    console.log("morgan & cors enabled.");
  }

  app.use(express.json());
  app.use(express.static("public"));

  app.use("/api/users", users);
};