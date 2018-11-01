const  app = require("express");
const router = app.Router();
import { catchErrors } from "../errorHandlers/errorHandlers";
const mongoose = require("mongoose");
const querymen = require("querymen"); //Transforms URL Query Strings to Java Obejcts to pass directly into Mongoose's Schema.Find()


//API related routes
const movieController = require("../controllers/movie.controller");

//CRUD - Movies
//get all movies. optional queries limit=2&skip=0
router.get(["/v1/movies/getAll"], catchErrors(movieController.getAllMovies));

// router.put("/api/v1/movies/:id/update", movieController.movie_update);

//router.get("/v1/movies/:id", catchErrors(movieController.getMoviebyID));
//router.get("/v1/movies/:slug", catchErrors(movieController.getMoviebySlug));


router.post("/v1/movies/create", movieController.createMovieByName);

// router.delete("/api/v1/movies/:id/delete", movieController.movie_delete);



//CRUD - Movie Session
//get all movies with active show sessions. optional queries limit=2&skip=0
// ! TODO removed after querymen is implemented
router.get(
  ["/v1/movies/getSessions/"],
  catchErrors(movieController.getMoviesWithActiveSessions)
); 


// get all movies with active show sessions by custom querying
// * Query schema for request =>  URL?movieID=324832987av323827&tag=Indian,Tamil&sessionsAfter=2018-10-16&state=NSW,VIC
const sessionQuerySchema = new querymen.Schema(
  {
    sort: "-updated",

    title: {
      //title = Venom
      type: String,
      paths: ["title"],
      operator: "$eq"
    },
    movieID: {
      //movieID = 324832987av323827
      type: mongoose.Types.ObjectId,
      paths: ["_id"],
      operator: "$eq"
    },
    language: {
      //language=Tamil
      type: String,
      paths: ["language"],
      operator: "$eq"
    },
    tags: {
      //tags=Period, Hollywood
      type: [String]
    },
    sessionsAfter: {
      type: Date,
      paths: ["sessionDateTime"],
      operator: "$gte",
      bindTo: "sessionStart" // default was 'query'
    },
    state: {
      type: String,
      paths: ["state"],
      operator: "$eq",
      bindTo: "cinemaState" // default was 'query'
    }
  },
  {
    page: "skip", // change name of default parameter `page` to `skip`
    limit: "limit"
  }
);

router.get(
  "/v1/movies/query/",
  querymen.middleware(sessionQuerySchema),
  catchErrors(movieController.getMoviesByQuery)
);


export default router;
