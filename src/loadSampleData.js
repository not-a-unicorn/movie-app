require("@babel/polyfill");
var regeneratorRuntime = require("regenerator-runtime");
var path = require("path");
// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

var helper = require("./helpers");

require("dotenv").config({ path: __dirname + "/.env" });
var fs = require("fs");

// Set up mongoose connection - Specfic URI in Environment variables takes precedence
// Connect to our Database and handle any bad connections
var mongoose = require("mongoose");
var dbURI =
  helper.getAppMode() == "PROD"
    ? process.env.DB_URI_PROD
    : process.env.DB_URI_DEV;
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);
console.log("***** Connecting to DB @ " + dbURI);

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", function(err) {
  console.error(
    "\uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \u2192 " +
      err.message
  );
});

// import all of our models - they need to be imported only once
var Movie = require("./movie.model");
var Session = require("./session.model");
var Cinema = require("./cinema.model");

var sampleDataDir = path.join(__dirname, "./../data/");
console.log(path.join(sampleDataDir, "_sessions.json"));


var movies = JSON.parse(
  fs.readFileSync(sampleDataDir + "_movies.json", "utf-8")
);
var sessions = JSON.parse(
  fs.readFileSync(sampleDataDir + "_sessions.json", "utf-8")
);
var cinemas = JSON.parse(
  fs.readFileSync(sampleDataDir + "_cinemas.json", "utf-8")
);

function deleteData() {
  console.log("😢😢 Goodbye Data...");
  try {
    console.log("about to try remove");
        Movie.remove(function(err, removed) {
      if (err) {
        console.log(err);
      } else {
        console.log(removed);
      }
    });

    Cinema.remove();
    Session.remove();
    console.log(
      "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
    );
  } catch (error) {
    console.log("Error in deleting sample data err: " + error.message);
  }
}

function loadData() {
  console.log("in loadData ");
  try {
    Movie.insertMany(movies);
    Session.insertMany(sessions);
    Cinema.insertMany(cinemas);

    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes("--delete")) {
  console.log("delete shit");
  deleteData();
} else {
    console.log('save shit');
  deleteData();
  loadData();
}
process.exit();
