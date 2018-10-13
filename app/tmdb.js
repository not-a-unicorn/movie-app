"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
require("isomorphic-fetch");
//API Access Key for  themoviedb.org
var movieAPIKey = "5066229b476a9c157a74692454f7661e";

function getMovieID(_apiKey, _movieName) {
  //Construct movie lookup URL
  if (!_apiKey) throw Error("Valid APIKey must be passed : " + _apiKey);
  if (!_movieName) throw Error("Movie name must be passed : " + _movieName);

  var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&query=[MOVIE_NAME]&page=1&include_adult=true";
  searchURL = searchURL.split("[API_KEY]").join(_apiKey).split("[MOVIE_NAME]").join(_movieName);

  return new Promise(function (resolve, reject) {
    fetch(searchURL).then(function (res) {
      res.json().then(function (data) {
        //If the movie array is empty search wasnt succesful
        if (data.results.length < 0) reject(Error("Lookup for movie name " + movieName + " didn't return results"));
        //retrieve movie with highest relevance
        var movieID = data.results[0].id;


        resolve(movieID);
      }).catch(function (err) {
        return reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
}
//Construct movie details lookup URL
function getMovieDetails(_apiKey, _movieID) {
  var _movieProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!_apiKey) throw Error("Valid APIKey must be passed : " + _apiKey);
  if (!_movieID) throw Error("MovieID  must be passed : " + _movieID);

  var movieDetailsURL = "https://api.themoviedb.org/3/movie/[MOVIE_ID]?api_key=[API_KEY]&append_to_response=[MOVIE_PROPERTIES]"; //videos,images OR videos OR images
  movieDetailsURL = movieDetailsURL.split("[API_KEY]").join(_apiKey).split("[MOVIE_ID]").join(_movieID);

  if (_movieProperties.length > 0) {
    movieDetailsURL = movieDetailsURL.split("[MOVIE_PROPERTIES]").join(_movieProperties.join(","));
  }

  return new Promise(function (resolve, reject) {
    fetch(movieDetailsURL).then(function (res) {
      res.json().then(function (movie) {
        //If the movie array is empty search wasnt succesful
        if (!movie) reject(Error("Lookup for movie name " + movieID + " didn't return results"));
        //retrieve movie with highest relevance

        var movieID = movie.id,
            title = movie.title,
            _movie$spoken_languag = _slicedToArray(movie.spoken_languages, 1),
            language = _movie$spoken_languag[0].name,
            synopsis = movie.overview,
            _movie$videos$results = _slicedToArray(movie.videos.results, 1),
            video = _movie$videos$results[0],
            posters = movie.images.posters,
            genres = movie.genres;

        //var {videos:{results:[video]}} = movie
        //var {videos:{results:[video]}} = movie
        //var {key: videoKey, site: videoSite}= video

        //Extract the first poster meeting the width criterion


        var posterURL = null;
        posters.forEach(function (poster) {
          if (poster.height <= 1080) {
            posterURL = getMoviePosterURL(poster.file_path.split("/").join(""), 500);
            return;
          }
        });

        //concatenate Youtube results //TODO: implement other video sites
        function videoURL() {
          return video.site == "YouTube" ? "https://www.youtube.com/watch?v=" + video.key : "Video site : " + video.site + " video key : " + video.key;
        }

        //Stringfy the Generes
        genresString = "";
        genres.forEach(function (genre) {
          genresString += genre.name + ", ";
        });

        //compose a partial movice object
        var _movie = {
          movieID: movieID,
          title: title,
          language: language,
          synopsis: synopsis,
          trailer: videoURL(),
          poster: posterURL,
          genres: genresString.replace(/,\s*$/, "")
        };

        console.log(_movie);
        resolve(_movie);
      }).catch(function (err) {
        return reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
}

//Construct movie poster URL
function getMoviePosterURL(_posterFile, _width) {
  if (!_width) throw Error("Poster width must be specified : " + _width);
  if (!_posterFile) throw Error("Poster file name must be specified : " + _posterFile);

  var posterURL = "https://image.tmdb.org/t/p/w[IMAGE_WIDTH]/[IMAGE_FILE_NAME]";
  return posterURL.split("[IMAGE_WIDTH]").join(_width).split("[IMAGE_FILE_NAME]").join(_posterFile);
}

// 1. Load the configuration

// 3. Look up additional trailer and poster info

function retrieveMovie() {
  var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var movieName = arguments[1];
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  getMovieID(movieAPIKey, "venom").then(function (movieID) {
    getMovieDetails(movieAPIKey, movieID, properties).then(function (data) {
      return console.log(data);
    }).catch(function (err) {
      console.log(err);
    });
  }).catch(function (err) {
    console.log(err);
  });
}

retrieveMovie("alien", null, ["videos", "images"]);
//module.exports = retrieveMovie;

// console.log(getMovieSearchURL("ABC123", "padam"));
// console.log(getMovieDetailsURL("ABC123", 123354, ["video", "poster"]));
// console.log(getMoviePosterURL("filename.png", 400));