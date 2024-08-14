const express = require("express");
const app = express.Router();

require("./user")(app);

module.exports = app;
