import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

export async function getMovie(req, res) {
  console.log("in getMovie");
  const _movies = await Movie.find();

  res.status(200).json(_movies);
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
      let msg = `Succesfully created movie/s ${movieNames.join()}`;
      jsonReponse.push({ Status: msg });
      movies.forEach(movie => {
        jsonReponse.push(movie);
      });
      res.status(200).json(jsonReponse);
    })
    .catch(err => {
      console.log(
        `Error creating movie/s  : ${movieNames.join()} Error :  ${err}`
      );
      res
        .status(500)
        .send(`Error creating movie/ ${movieNames.join()} in database`);
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
