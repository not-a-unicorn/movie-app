"use strict";

//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
var MovieDb = require("moviedb-promise");
require("babel-polyfill");

//API Access Key from omdbapi.com
var TmDBKey = "5066229b476a9c157a74692454f7661e";

function retrieveMovie(movieName, apiKey) {
  return new Promise(function (resolve, reject) {
    // @apiKey is an optional parameter

    TmDBKey = apiKey == null ? TmDBKey : apiKey;

    var moviedb = new MovieDb(TmDBKey);

    moviedb.searchMovie({ query: movieName }).then(function (result) {
      resolve(result);
    });
  });
}

retrieveMovie("alien", null).then(function (res) {
  console.log(res);
});
//module.exports = retrieveMovie;