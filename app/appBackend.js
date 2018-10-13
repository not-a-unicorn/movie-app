"use strict";

var _app = require("./app.route");

var _app2 = _interopRequireDefault(_app);

var _movie = require("./movie.route");

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require("dotenv").config();
var path = require("path"); // remove later

//import appwide routes


// Set up mongoose connection - Specfic URI in Environment variables takes precedence
var dbURI = process.env.DB_URI || "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME;

console.log("DB URL " + dbURI);
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Web Server
app.use(morgan("dev")); //HTTP request logger

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Static files -- NEED TO DEBUG

// const staticFiles = path.join(__dirname, "../../public");
// console.log(`Static files : ${staticFiles}`);
// app.use(express.static(path.join(__dirname, 'public')));

//Assign Route definitions to the request
app.use("/", _app2.default);
app.use(["/movie", "/movies"], _movie2.default);

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Movie App server is up and running on port numner " + port);
});