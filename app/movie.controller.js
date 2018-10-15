"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createMovieByName = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_movieName) {
    var dbMovie, modelMovie;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return tmdb.retrieveMovie({ movieName: _movieName });

          case 2:
            dbMovie = _context.sent;
            modelMovie = new Movie({});

            Object.assign(modelMovie, dbMovie);
            _context.next = 7;
            return modelMovie.save();

          case 7:
            return _context.abrupt("return", modelMovie);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createMovieByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

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


exports.createMovie = createMovie;

var _util = require("util");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

function createMovie(req, res) {
  var movieNames = req.body.movieNames;
  movieNames = (0, _util.isArray)(movieNames) ? movieNames : [movieNames]; //If one movie is passed a string turn it into an array

  var jsonReponse = [];
  var promises = [];
  movieNames.forEach(function (movieName) {
    promises.push(Promise.resolve(createMovieByName(movieName)));
  });

  Promise.all(promises).then(function (movies) {
    console.log("Succesfully created movie/s " + movieNames.join());
    var msg = "Succesfully created movie/s " + movieNames.join();
    jsonReponse.push({ Status: msg });
    movies.forEach(function (movie) {
      jsonReponse.push(movie);
    });
    res.json(jsonReponse);
  }).catch(function (err) {
    console.log("Error creating movie/s  : " + movieNames.join() + " Error :  " + err);
    res.send("Error creating movie/ " + movieNames.join() + " in database");
  });
}