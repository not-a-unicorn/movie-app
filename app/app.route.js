"use strict";

var express = require("express");
var router = express.Router();
var path = require("path");

// test
//router.get("/index.html", movieController.test);

router.get("/", function (req, res) {
  var clientEntryPoint = path.join(__dirname + "../../public/app.html");
  // let clientEntryPoint = path.join(__dirname + "/public/app.html");
  console.log("in index. About to route to " + clientEntryPoint);
  res.sendFile(clientEntryPoint);

  //res.sendFile(path.join(__dirname+'/../public/app.html'));
});
module.exports = router;