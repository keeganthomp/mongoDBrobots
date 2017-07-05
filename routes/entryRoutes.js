const express = require("express");
const entryRoutes = express.Router();
// const dataFile = require("../database/data");



entryRoutes.get("/users", (req, res) => {
  ROBOTDATA.find({}).toArray(function(err, foundRobots) {
    if (err) {
      res.status(500).send(err);
    }

    res.send(foundRobots);
  });
});


module.exports = entryRoutes;