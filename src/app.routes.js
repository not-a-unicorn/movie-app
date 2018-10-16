const express = require("express");
const router = express.Router();
const { catchErrors } = require("./errorHandlers");

const bodyParser = require("body-parser");
const path = require("path");
const regeneratorRuntime = require("regenerator-runtime");

//Global App Routes
// router.get("/", function(req, res) {
//   let clientEntryPoint = path.join(__dirname + "../../public/app.html");
//   // let clientEntryPoint = path.join(__dirname + "/public/app.html");
//   console.log(`in index. About to route to ${clientEntryPoint}`);
//   res.sendFile(clientEntryPoint);

//   //res.sendFile(path.join(__dirname+'/../public/app.html'));
// });


//API related routes
const movieController = require("./movie.controller");

//Routes for CRUD functions of movie endpoint
router.get("/testsearch", catchErrors(movieController.getMovie));


// router.put("/api/v1/movies/:id/update", movieController.movie_update);

// router.get("/api/v1/movies/:id", movieController.movie_details);
router.get(["/movies/", "/movie", "/api/v1/movies/"], movieController.getMovie); //deprecate root level API serves


 router.post("/api/v1/movies/create", movieController.createMovie);
// router.post("/api/v1/movies/createbulk", movieController.movie_createbulk);

// router.delete("/api/v1/movies/:id/delete", movieController.movie_delete);

module.exports = router;
