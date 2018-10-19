import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("../models/movie.model");
var Session = require("../models/session.model");
var Cinema = require("../models/cinema.model");
var tmdb = require("../vendor/tmdb");

//Returns all movies irrespective without session(show) info
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

//Return movie by the slug
export async function getMoviebySlug(req, res, next) {
  const movie = await Movie.findOne({ slug: req.params.slug });

  if (!movie) return next();

  handleResponse({
    reponse: res,
    status: "success",
    message: `Succesfully retrieve  movie ${movie.title}`,
    content: [movie]
  });
}

//Return movie by ID
export async function getMoviebyID(req, res, next) {
  const movie = await Movie.findOne({ _id: req.params.id });

  if (!movie) return next();

  handleResponse({
    reponse: res,
    status: "success",
    message: `Succesfully retrieve  movie ${movie.title}`,
    content: [movie]
  });
}

// TODO: determine how to determine whats and active session
//Returns all movies with only active sessions
export async function getMoviesWithActiveSessions(req, res) {
  const limit = Number(req.query.limit) || 100;
  const skip = limit * Number(req.query.skip) || 0;

  var movieSessions = [];
  try {
    let movies = await Movie.find()
      .limit(limit)
      .skip(skip);

    for (const movie of movies) {
      const sessions = await Session.find({ movie: movie._id }).populate(
        "cinema"
      );
      // TODO : do this "document join" in mongodbitself to reduce IO + Network
      //construct movie and sessions into a single obect
      const movieSession = { ...movie._doc, sessions };
      movieSessions.push(movieSession);
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

//Helpder Method
//TODO: Refactor by extracting into @helper.js
// ? can this be done by enabling the callee function to send the the reponse
function handleResponse({ reponse, status, message = "", content = [] }) {
  //http Status
  let httpStatus = status == "success" ? 200 : 500;

  const _status = { status, message };
  const obj = { status: _status, content };
  reponse.status(httpStatus).json(obj);
}
