//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
const MovieDb = require("moviedb-promise");
require("babel-polyfill");

//API Access Key from omdbapi.com
let TmDBKey = "5066229b476a9c157a74692454f7661e";

  function retrieveMovie(movieName,  apiKey) {
  return new Promise((resolve, reject) => {
    // @apiKey is an optional parameter
    
    TmDBKey = apiKey == null ? TmDBKey : apiKey;

    let moviedb = new MovieDb(TmDBKey);

    moviedb.searchMovie({ query: movieName }).then(result => {
      resolve(result);
    });
  });
}

retrieveMovie("alien", null).then(res => {
  console.log(res);
});
//module.exports = retrieveMovie;
