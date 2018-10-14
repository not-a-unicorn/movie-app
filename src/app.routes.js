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
router.get("/testsearch", catchErrors(movieController.searchMovie));

router.put("/api/movies/:id/update", movieController.movie_update);

router.get("/api/movies/:id", movieController.movie_details);
router.get(["/movies/", "/movie", "/api/v1/movies/"], movieController.movie_dedetailsAll); //deprecate root level API serves


router.post("/api/movies/create", movieController.movie_create);
router.post("/api/movies/createbulk", movieController.movie_createbulk);

router.delete("/api/movies/:id/delete", movieController.movie_delete);

module.exports = router;
