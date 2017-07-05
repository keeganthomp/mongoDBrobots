const express = require("express");
const userRoutes = express.Router();
const datafile = require("../database/data");


userRoutes.get("/:id", function(req, res) {
  var userIndex = req.params.id -1;
  res.render("details", { dataUser: datafile.users[userIndex]});
});

userRoutes.use("/:id", express.static("./views"));

module.exports = userRoutes;