import { isArray } from "util";

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

export function createMovie(req, res) {
  let movieNames = req.body.movieNames;
  movieNames = isArray(movieNames) ? movieNames : [movieNames]; //If one movie is passed a string turn it into an array

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
      res.json(jsonReponse);
    })
    .catch(err => {
      console.log(
        `Error creating movie/s  : ${movieNames.join()} Error :  ${err}`
      );
      res.send(`Error creating movie/ ${movieNames.join()} in database`);
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

// .then(movie => {
//   console.log(`Succesfully created movie ${movie.title}`);
//   //res.send(`Succesfully created movie ${movie.title} ID ${movie.id}`);
//
//   //jsonReponse.push(JSON.stringify({ STATUS: msg, MOVIE: movie }));

//   jsonReponse.push({ MOVIE: movie });
//   console.log("&&&&&");
//   console.log(jsonReponse);
//   console.log("&&&&&");
// })
// .catch(err => {
// });
