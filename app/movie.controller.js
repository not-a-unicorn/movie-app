"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovie = undefined;

var getMovie = exports.getMovie = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _movies;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("in getMovie");
            _context.next = 3;
            return Movie.find();

          case 3:
            _movies = _context.sent;


            clientResponse.status = "successfully retrieved movies";
            clientResponse.content.push(_movies);
            res.status(200).json(clientResponse);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMovie(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//Add one or more movies based on name/s passed in the request body


var createMovieByName = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_movieName) {
    var dbMovie, modelMovie;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tmdb.retrieveMovie({ movieName: _movieName });

          case 2:
            dbMovie = _context2.sent;
            modelMovie = new Movie({});

            Object.assign(modelMovie, dbMovie);

            _context2.next = 7;
            return modelMovie.save();

          case 7:
            return _context2.abrupt("return", modelMovie);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function createMovieByName(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createMovie = createMovie;

var _util = require("util");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { Movie } from "./movie.model";
var Movie = require("./movie.model");
var bodyParser = require("body-parser");
var tmdb = require("./tmdb");

//JSON reponse object

var clientResponse = {
  status: {},
  content: []
};

function createMovie(req, res) {
  var movieNames = req.body.movieNames;
  //If one movie is passed a string turn it into an array
  movieNames = (0, _util.isArray)(movieNames) ? movieNames : [movieNames];

  var jsonReponse = [];
  var promises = [];
  movieNames.forEach(function (movieName) {
    promises.push(Promise.resolve(createMovieByName(movieName)));
  });

  Promise.all(promises).then(function (movies) {
    console.log("Succesfully created movie/s " + movieNames.join());

    var moviesCreated = [];
    movies.forEach(function (movie) {
      moviesCreated.push(movie.title);
      clientResponse.content.push(movie);
    });
    clientResponse.status = "Succesfully created movie/s " + moviesCreated.join();
    res.status(200).json(clientResponse);
    clientResponse.content = [];
  }).catch(function (err) {
    console.log("Error creating movie/s  : " + movieNames.join() + " Error :  " + err);
    clientResponse.status = "Error creating movie/s " + movieNames.join() + " in database";
    clientResponse.content = {};
    res.status(500).json(clientResponse);
  });
}