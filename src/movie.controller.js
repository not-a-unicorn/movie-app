import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

//JSON reponse object

let clientResponse = {
  status: {},
  content: []
};

export async function getMovie(req, res) {
  console.log("in getMovie");
  const _movies = await Movie.find();

  clientResponse.status = "successfully retrieved movies";
  clientResponse.content.push (_movies);
  res.status(200).json(clientResponse);
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
      clientResponse.status = `Succesfully created movie/s ${movieNames.join()}`;
      movies.forEach(movie => {
        clientResponse.content.push(movie);
      });
      res.status(200).json(clientResponse);
    })
    .catch(err => {
      console.log(
        `Error creating movie/s  : ${movieNames.join()} Error :  ${err}`
      );
      clientResponse.status = `Error creating movie/s ${movieNames.join()} in database`;
      clientResponse.content = {};
      res
        .status(500)
        .json(clientResponse)
        
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
