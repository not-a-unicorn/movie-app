const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path"); // remove later

//import appwide routes
import routes from "./app.routes";




//Web Server
app.use(morgan("dev")); //HTTP request logger

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
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
app.use('/', routes);

let port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log("Movie App server is up and running on port numner " + port);
// });

module.exports = app;
