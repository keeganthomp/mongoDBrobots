const express = require("express");
const entryRoutes = express.Router();
const dataFile = require("../database/data");



entryRoutes.get("/", function(req, res) {
  res.render("index", { dataFile: dataFile.users });
});



module.exports = entryRoutes;