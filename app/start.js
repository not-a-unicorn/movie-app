"use strict";

// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

// Set up mongoose connection - Specfic URI in Environment variables takes precedence
// Connect to our Database and handle any bad connections
var mongoose = require("mongoose");
var dbURI = process.env.DB_URI || "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME;
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", function (err) {
  console.error("\uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \u2192 " + err.message);
});

// import all of our models
require("./movie.model");

// Start our app!
var app = require("./app");
app.set("port", process.env.PORT || 5000);
var server = app.listen(app.get("port"), function () {
  console.log("Movie-App Serverside started on  \u2192 PORT " + server.address().port);
});