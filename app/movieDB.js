"use strict";

require("isomorphic-fetch");

//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB

//API Access Key from omdbapi.com
var TmDBKey = "5066229b476a9c157a74692454f7661e";

function retrieveMovie(movieName, apiKey) {
    return new Promise(function (resolve, reject) {
        // @apiKey is an optional parameter

        TmDBKey = apiKey == null ? TmDBKey : apiKey;

        //using fetch

        fetch("https://api.themoviedb.org/4/list/1?api_key=" + TmDBKey).then(function (res) {
            resolve(res.json());
        }).catch(function (err) {
            console.log("errored");
        });

        // const MovieDB = require("moviedb")(TmDBKey);

        // MovieDB.searchMovie({ query: "Zoolander" }, (err, res) => {
        //   console.log(res);
        // }).movieInfo({ id: 123 }, (err, res) => {
        //   console.log(res);
        // });

        // // setting french as default language...
        // tmdb.setLanguage('fr');
        // // and resetting to english.
        // tmdb.resetLanguage();

        // let moviedb = new MovieDb(TmDBKey);

        // moviedb.searchMovie({ query: movieName }).then(result => {
        //   resolve(result);
    });
}

retrieveMovie("alien", null).then(function (res) {
    console.log(res);
});
//module.exports = retrieveMovie;

// retrieveMovie("alien", null);