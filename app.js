// var datafile = require("./database/data");
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbUrl = "mongodb://localhost:27017/brobots";
var userRoutes = require("./routes/userRoutes");
const mustache = require("mustache-express");
const entryRoutes = require("./routes/entryRoutes");
const express = require("express");
const app = express();
const port = 3050;

app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", "./views");

let DB;
let ROBOTDATA;


mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error connecting to database", err);
  }
  DB = db;
  ROBOTDATA = db.collection("robotData");
});


app.get("/users", (req, res) => {
  ROBOTDATA.find({}).toArray(function(err, foundRobots) {
    if (err) {
      res.status(500).send(err);
    }
    console.log("FOUND BOTS:", foundRobots);
    console.log("FOUND FIRST ITEM IN BOT ARRAY", foundRobots);
    res.render("index", {robotUsers: foundRobots});
  });
});

app.get("/unemployed", (req, res) => {
    ROBOTDATA.find({"job": null}).toArray(function(err, foundRobots) {
    if (err) {
      res.status(500).send(err);
    }
    // console.log("FOUND BOTS:", foundRobots);
    console.log("FOUND FIRST ITEM IN BOT ARRAY", foundRobots[0]);
    res.render("index", {robotUsers: foundRobots});
  });
});

app.get("/employed", (req, res) => {
    ROBOTDATA.find({"job": {$ne: null}}).toArray(function(err, foundRobots) {
    if (err) {
      res.status(500).send(err);
    }
    // console.log("FOUND BOTS:", foundRobots);
    console.log("FOUND FIRST ITEM IN BOT ARRAY", foundRobots[0]);
    res.render("index", {robotUsers: foundRobots});
  });
});



app.use("/", express.static("./public"));
// app.use("/", entryRoutes);
app.use("/users", userRoutes);

app.listen(port, function(req, res) {
  console.log("Im running on port", port);
});

// app.use("/users/:id", express.static("./views"));
