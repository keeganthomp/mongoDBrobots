var datafile = require("./database/data");
var userRoutes = require("./routes/userRoutes");
const mustache = require("mustache-express");
const entryRoutes = require("./routes/entryRoutes");
const express = require("express");
const app = express();
const port = 3050;

app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", "./views");

app.use("/", express.static("./public"));
app.use("/", entryRoutes);
app.use("/users", userRoutes);

app.listen(port, function(req, res) {
  console.log("Im running on port", port);
});


// app.use("/users/:id", express.static("./views"));
