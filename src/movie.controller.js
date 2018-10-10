var { Movie } = require("./movie.model");
var { Session } = require("./movie.model");
const bodyParser = require("body-parser");

var { getStatus } = require("./movie.response");
const mongoose = require("mongoose");
var retrieveMovie = require("./imdb");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  console.log("in Test");
  res.send("Test Controller for the movie endpoint");
};

//Lookp movie with id
exports.movie_details = function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    if (err) return next(err);
    res.send(movie);
  });
};

//Lookup all movies
exports.movie_dedetailsAll = function(req, res) {
  console.log("in /movie");
  Movie.find(function(err, movies) {
    if (err) return err;
    res.status(200).json(movies);
    //res.send(movie);
  });
};

//Delete movie with id
exports.movie_delete = function(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

//Update movie with id
exports.movie_update = function(req, res) {
  Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    movie
  ) {
    if (err) return next(err);
    res.send("Product udpated.");
  });
};

//Create new movie
exports.movie_create = function(req, res) {
  console.log("in product route");
  let movie = new Movie({
    name: req.headers.name,
    price: req.headers.price
    //name: "orang",
    // price: "20"
  });
  console.log("product " + movie);

  movie.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });
};

//Create Movies from IMDB
exports.movie_createbulk = function(req, res) {
  let moviename = req.body.movies;
  retrieveMovie(moviename)
    .then(_movie => {
      let session = new Session({
        _sesionid: new mongoose.Types.ObjectId(),
        state: "NSW"
      }); //New Session

      //Movie
      let movie = new Movie({
        title: _movie.title,
        language: _movie.languages,
        synopsis: _movie.plot,
        trailer: "",
        poster: _movie.poster,
        leadActors: _movie.actors,
        cast: _movie.actors, //duplicate of leadActors
        crew: {
          director: _movie.director,
          musicDirector: ""
        },
        sessions: [session]
      }); //new Movie

      movie.save(function(err) {
        if (err) {
          //return next(err);
          console.log(`Error occured in saving movie ${movie.title} ${err}`);
          res.send(`{Error : ${e}`);
        }
        res.status(200).json(`{Success : Movie  created} ${movie}`);
      });
    }) //then
    .catch(e => {
      res.status(404).json({ Error: "Movie doesnt exist" });

      console.log(e);
    });
};
