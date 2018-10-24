const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helper = require("./helpers/helpers");
require("dotenv").config();

//import appwide routes
import appRoutes from "./routes/app.routes";
import testRoutes from "/routes/testData.routes";

//Web Server
app.use(morgan("dev")); //HTTP request logger

//Easy reading of request info
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set headers
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

// http://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs   ?
//Static files
//app.use("/assets", express.static("public"));

//Assign Route definitions to the request
app.use("/api", appRoutes);

if (helper.isDevelopmentMode()) {
  app.use("/test", testRoutes); //enable facility load test data if the NODE_ENV is development
  require("dotenv").config(); //  load environmental configs if the NODE_ENV is development
}

//Error handling
//404 - Not found
app.use((req, res, next) => {
  const err = Error("Not found");
  err.status = 404;
  next(err);
});

//Global error handling
app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.json({
    error: {
      message: err.message
    }
  });
});



module.exports = app;
