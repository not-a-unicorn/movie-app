"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
require("isomorphic-fetch");

//Helper method
function stripTrailingCommas(_string) {
  return _string.replace(/,\s*$/, "");
}

//API Access Key for themoviedb.org
var movieAPIKey = "5066229b476a9c157a74692454f7661e";

//Consturcts the URL to fetch MovieID from themoviedb.org
function getMovieIDURL(_apiKey, _movieName) {
  var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&query=[MOVIE_NAME]&page=1&include_adult=true";
  searchURL = searchURL.split("[API_KEY]").join(_apiKey).split("[MOVIE_NAME]").join(_movieName);
  return searchURL;
}
//get movieID from themoviedb.org
//Used to get all other movie details
function getMovieID(_apiKey, _movieName) {
  //Construct movie lookup URL
  if (!_apiKey) throw Error("Valid APIKey must be passed : " + _apiKey);
  if (!_movieName) throw Error("Movie name must be passed : " + _movieName);

  var searchURL = getMovieIDURL(_apiKey, _movieName);

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

//Consturcts the URL to fetch Movie Details
function getMoviesDetailsURL(_apiKey, _movieID) {
  var _movieProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var movieDetailsURL = "https://api.themoviedb.org/3/movie/[MOVIE_ID]?api_key=[API_KEY]&append_to_response=[MOVIE_PROPERTIES]"; //videos,images OR videos OR images
  movieDetailsURL = movieDetailsURL.split("[API_KEY]").join(_apiKey).split("[MOVIE_ID]").join(_movieID);

  //Compose append_to_response from  MovieProperties array
  if (_movieProperties.length > 0) {
    movieDetailsURL = movieDetailsURL.split("[MOVIE_PROPERTIES]").join(_movieProperties.join(","));
  }
  return movieDetailsURL;
}

//get all details of the movie using getMovieID()
function getMovieDetails(_apiKey, _movieID) {
  var _movieProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!_apiKey) throw Error("Valid APIKey must be passed : " + _apiKey);
  if (!_movieID) throw Error("A valid movieID must be passed : " + _movieID);

  var movieDetailsURL = getMoviesDetailsURL(_apiKey, _movieID, _movieProperties);

  return new Promise(function (resolve, reject) {
    fetch(movieDetailsURL).then(function (res) {
      res.json().then(function (_movieResult) {
        //If the movie array is empty search wasnt succesful
        if (!_movieResult) reject(Error("Lookup for movie name " + movieID + " didn't return results"));
        //retrieve movie with highest relevance

        var movieID = _movieResult.id,
            title = _movieResult.title,
            _movieResult$spoken_l = _slicedToArray(_movieResult.spoken_languages, 1),
            language = _movieResult$spoken_l[0].name,
            synopsis = _movieResult.overview,
            _movieResult$videos$r = _slicedToArray(_movieResult.videos.results, 1),
            video = _movieResult$videos$r[0],
            posters = _movieResult.images.posters,
            genres = _movieResult.genres,
            castObjList = _movieResult.credits.cast,
            crewObjList = _movieResult.credits.crew;

        //Extract the first poster meeting the width criterion


        var posterURL = null;
        posters.forEach(function (poster) {
          if (poster.height <= 1080) {
            posterURL = getMoviePosterURL(poster.file_path.split("/").join(""), 500);
            return;
          }
        });

        //Stringfy the Generes
        var genresString = "";
        genres.forEach(function (genre) {
          genresString += genre.name + ", ";
        });

        //Extract details of actors
        var leadActorsString = "";
        var castString = "";
        castObjList.forEach(function (castObj, index) {
          castString = castString.concat(castObj.name, ", ");
          //add only top 4 actors as lead actors
          if (castObjList.length >= 4 && index < 4) {
            leadActorsString = leadActorsString.concat(castObj.name, ", ");
          }
        });

        var crew = { director: "", musicDirector: "" };

        //Identify crew
        crewObjList.forEach(function (_crew, index) {
          switch (_crew.department) {
            case "Directing":
              crew.director = crew.director.concat(_crew.name, ", ");
              break;
            case "Sound":
              crew.musicDirector = crew.musicDirector.concat(_crew.name, ", ");
              break;
          }
        });

        //Trim trailing commas - Need to find a way to do below with other properties
        crew.director = stripTrailingCommas(crew.director);
        crew.musicDirector = stripTrailingCommas(crew.musicDirector);
        //compose a partial movice object
        var movie = {
          movieID: movieID,
          title: title,
          language: language,
          synopsis: synopsis,
          trailer: "",
          poster: posterURL,
          genres: stripTrailingCommas(genresString),
          cast: stripTrailingCommas(castString),
          leadActors: stripTrailingCommas(leadActorsString),
          crew: crew
        };

        //resolve trailer link -- "Cleaner way to do this ?"
        if (!(video === undefined) && !(video.site === undefined) && video.site == "YouTube") {
          movie.trailer = "https://www.youtube.com/watch?v=" + video.key;
        }

        resolve(movie);
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

//Retieve moive detals with helper functions
function retrieveMovie(apiKey, movieName) {
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return new Promise(function (resolve, reject) {
    getMovieID(apiKey, movieName).then(function (movieid) {
      getMovieDetails(movieAPIKey, movieid, properties).then(function (movie) {
        resolve(movie); // resolve promise with all movie details
      }).catch(function (err) {
        reject("Error: Unable to retrieve Movie Details for " + movieName + " with ID " + movieid);
      }); //getMovieDetails().catch()
    }).catch(function (err) {
      reject("Error: Unable to retrieve Movie ID  for movie " + movieName);
    }); //getMovieID().catch()
  }); //return new Promise()
}

//let testMovies = ["chekka chivantha vaanam", "venom", "minnale", "titanic"];
//let testMovies = ["paw patrol", "cars", "rapunzel", "cinderella"];
var testMovies = ["Kadaikutty Singam"];
testMovies.forEach(function (movieitem) {
  retrieveMovie(movieAPIKey, movieitem, ["videos", "images", "credits"]).then(function (movie) {
    // console.log(JSON.parse(JSON.stringify(movie, null, "")));
    console.log(JSON.stringify(movie, null, 2));
    //movie.json().then(jsonString => console.log(jsonString));
  });
});