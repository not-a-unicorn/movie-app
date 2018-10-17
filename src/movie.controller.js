import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var Session = require("./session.model");
var Cinema = require("./cinema.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

//JSON reponse object

let clientResponse = {
  reponse: { status: "", message: "" },
  content: []
};
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

export async function getMoviesWithActiveSessions(req, res) {
  // .select("+updated"); to included an excluded field

  const _limit = Number(req.query.limit) || 10;
  const _skip = _limit * Number(req.query.skip) || 0;

  try {
    //refactor to return on movies with live sessions

    const movies = await Movie.where("sessions")
      .ne([])
      .populate({ path: "sessions", populate: { path: "cinema" } });

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
//Add one or more movies based on name/s passed in the request body
export function createMovie(req, res) {
  let movieNames = req.body.movieNames;
  //If one movie is passed a string turn it into an array
  movieNames = isArray(movieNames) ? movieNames : [movieNames];

  var jsonReponse = [];
  let promises = [];
  movieNames.forEach(movieName => {
    promises.push(Promise.resolve(createMovieByName(movieName)));
  });

  Promise.all(promises)
    .then(movies => {
      console.log(`Succesfully created movie/s ${movieNames.join()}`);

      let moviesCreated = [];
      movies.forEach(movie => {
        moviesCreated.push(movie.title);
        clientResponse.content.push(movie);
      });
      clientResponse.reponse = `Succesfully created movie/s ${moviesCreated.join()}`;
      res.status(200).json(clientResponse);
      clientResponse.content = [];
    })
    .catch(err => {
      console.log(
        `Error creating movie/s  : ${movieNames.join()} Error :  ${err}`
      );
      clientResponse.reponse = `Error creating movie/s ${movieNames.join()} in database`;
      clientResponse.content = {};
      res.status(500).json(clientResponse);
    });
}

async function createMovieByName(_movieName) {
  //Lookup movie from the 3rd party movie data API
  let dbMovie = await tmdb.retrieveMovie({ movieName: _movieName });
  let modelMovie = new Movie({});
  Object.assign(modelMovie, dbMovie);

  await modelMovie.save();
  return modelMovie;
}

function handleResponse({ reponse, status, message = "", content = [] }) {
  //http Status
  let httpStatus = status == "success" ? 200 : 500;

  //Set override message if no message passed
  if (!message) {
    if (status == "success") {
      message =
        content.length > 0
          ? "Successfully retrieved movies"
          : "No movies available for the specified criteria";
    } else if (status == "error") {
      message = "Failure occured in retrieving movies";
    }
  }

  const obj = { status, message, content };
  reponse.status(httpStatus).json(obj);
}
