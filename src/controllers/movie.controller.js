import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("../models/movie.model");
var Session = require("../models/session.model");
var Cinema = require("../models/cinema.model");
var bodyParser = require("body-parser");
var tmdb = require("../vendor/tmdb");

//Returns all movies irrespective of active sessions
export async function getAllMovies(req, res) {
  // .select("+updated"); to included an excluded field

  const _limit = Number(req.query.limit) || 10;
  const _skip = _limit * Number(req.query.skip) || 0;

  try {
    let movies = await Movie.find()
      .limit(_limit)
      .skip(_skip);

    //TO DO: add some sort capability to increase relevance
    handleResponse({
      reponse: res,
      status: "success",
      content: movies
    });
  } catch (error) {
    handleResponse({
      reponse: res,
      status: "error",
      message: error.message
    });
  }
}

// TODO: determine how to determine whats and active session
//Returns all movies with only active sessions
export async function getMoviesWithActiveSessions(req, res) {
  const _limit = Number(req.query.limit) || 10;
  const _skip = _limit * Number(req.query.skip) || 0;

  var movieSessions = [];
  try {
    //refactor to return on movies with live sessions
    let movies = await Movie.find()
      .limit(_limit)
      .skip(_skip);

    for (const movie of movies) {
      const sessions = await Session.find({ movie: movie._id }).populate(
        "cinema"
      );

      movieSessions.push(...sessions);
    }

    handleResponse({
      reponse: res,
      status: "success",
      message:
        movieSessions.length > 0
          ? "Successfully retrieved movies"
          : "No movies available for the specified criteria",
      content: movieSessions
    });
  } catch (error) {
    console.log("error");
    handleResponse({
      reponse: res,
      status: "error",
      message: error.message
    });
  }
}

//Add one or more movies based on name/s passed in the request body
export async function createMovieByName(req, res) {
  let movieNames = req.body.movieNames;

  //If one movie is passed a string turn it into an array
  movieNames = isArray(movieNames) ? movieNames : [movieNames];

  // TODO: the code is blocking.. how could this be done so that each movie look up + save pair is done asynch?
  let savedMovies = [];
  try {
    for (const movieName of movieNames) {
      const dbMovie = await tmdb.retrieveMovie({
        apiKey: process.env.MOVIE_DB_APIKEY,
        movieName: movieName
      });

      let movie = await new Movie({ ...dbMovie });

      savedMovies.push(movie);
      await movie.save();
    }

    console.log(`Succesfully created movie/s ${movieNames.join()}`);

    handleResponse({
      reponse: res,
      status: "success",
      message: `Succesfully created movie/s ${movieNames.join()}`,
      content: savedMovies
    });
  } catch (err) {
    console.log(
      `Error creating movie/s  : ${movieNames.join()} Error :  ${err}`
    );
    handleResponse({
      reponse: res,
      status: "error",
      message: `Error creating movie/s ${movieNames.join()} in database`
    });
  }
}

function handleResponse({ reponse, status, message = "", content = [] }) {
  console.log(content);
  //http Status
  let httpStatus = status == "success" ? 200 : 500;

  const _status = { status, message };
  const obj = { status: _status, content };
  reponse.status(httpStatus).json(obj);
}
