"use strict";

var _app = require("./app.routes");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
require("dotenv").config(); //  load environmental configs for in Dev

//import appwide routes


//Web Server
app.use(morgan("dev")); //HTTP request logger

//Easy reading of request info
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set headers
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

//Error handling
//404 - Not found
app.use(function (req, res, next) {
  var err = Error("Not found");
  err.status = 404;
  next(err);
});

//Global error handling
app.use(function (err, req, res, next) {
  res.status = err.status || 500;
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;