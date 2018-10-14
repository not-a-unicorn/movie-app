"use strict";

// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });
var helper = require("./helpers");
require("regenerator-runtime/runtime");

//Emit app mode - prod vs dev
console.log("***** Application mode " + helper.getAppMode());

// Set up mongoose connection - Specfic URI in Environment variables takes precedence
// Connect to our Database and handle any bad connections
var mongoose = require("mongoose");
var dbURI = helper.getAppMode() == "PROD" ? process.env.DB_URI_PROD : process.env.DB_URI_DEV;
mongoose.connect(dbURI, { useNewUrlParser: true });
console.log("***** Connecting to DB @ " + dbURI);

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
  console.log("******Movie-App Serverside started on  \u2192 PORT " + server.address().port);
});