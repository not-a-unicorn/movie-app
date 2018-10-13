const express = require("express");
const router = express.Router();
var path = require("path");

// test
//router.get("/index.html", movieController.test);

router.get("/", function(req, res) {
  let clientEntryPoint = path.join(__dirname + "../../public/app.html");
  // let clientEntryPoint = path.join(__dirname + "/public/app.html");
  console.log(`in index. About to route to ${clientEntryPoint}`);
  res.sendFile(clientEntryPoint);

  //res.sendFile(path.join(__dirname+'/../public/app.html'));
});
module.exports = router;
