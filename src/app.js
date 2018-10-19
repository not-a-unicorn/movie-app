<<<<<<< HEAD
=======

>>>>>>> origin/serverside
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
<<<<<<< HEAD
const helper = require("./helpers/helpers");
require("dotenv").config();

//import appwide routes
import appRoutes from "./routes/app.routes";
import testRoutes from "/routes/testData.routes";
=======
require("dotenv").config(); //  load environmental configs for in Dev

//import appwide routes
import appRoutes from "./app.routes";
import testRoutes from "./testData.routes";
>>>>>>> origin/serverside

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

//Static files -- NEED TO DEBUG
// const staticFiles = path.join(__dirname, "../../public");
// console.log(`Static files : ${staticFiles}`);
// app.use(express.static(path.join(__dirname, 'public')));

//Assign Route definitions to the request
<<<<<<< HEAD
app.use("/", appRoutes);

if (helper.isDevelopmentMode()) {
  app.use("/test", testRoutes); //enable facility load test data if the NODE_ENV is development
  require("dotenv").config(); //  load environmental configs if the NODE_ENV is development
}
=======

app.use("/test", testRoutes);
app.use("/", appRoutes);
>>>>>>> origin/serverside

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
<<<<<<< HEAD
=======
  
>>>>>>> origin/serverside
