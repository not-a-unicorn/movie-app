//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
require("isomorphic-fetch");

//Helper method
function stripTrailingCommas(_string) {
  return _string.replace(/,\s*$/, "");
}

//API Access Key for themoviedb.org
let movieAPIKey = "5066229b476a9c157a74692454f7661e";

//Consturcts the URL to fetch MovieID from themoviedb.org
function getMovieIDURL(_apiKey, _movieName) {
  let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&query=[MOVIE_NAME]&page=1&include_adult=true`;
  searchURL = searchURL
    .split("[API_KEY]")
    .join(_apiKey)
    .split("[MOVIE_NAME]")
    .join(_movieName);
  return searchURL;
}
//get movieID from themoviedb.org
//Used to get all other movie details
function getMovieID(_apiKey, _movieName) {
  //Construct movie lookup URL
  if (!_apiKey) throw Error(`Valid APIKey must be passed : ${_apiKey}`);
  if (!_movieName) throw Error(`Movie name must be passed : ${_movieName}`);

  let searchURL = getMovieIDURL(_apiKey, _movieName);

  return new Promise((resolve, reject) => {
    fetch(searchURL)
      .then(res => {
        res
          .json()
          .then(data => {
            //If the movie array is empty search wasnt succesful
            if (data.results.length < 0)
              reject(
                Error(
                  `Lookup for movie name ${movieName} didn't return results`
                )
              );
            //retrieve movie with highest relevance
            var { id: movieID } = data.results[0];

            resolve(movieID);
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

//Consturcts the URL to fetch Movie Details
function getMoviesDetailsURL(_apiKey, _movieID, _movieProperties = []) {
  let movieDetailsURL = `https://api.themoviedb.org/3/movie/[MOVIE_ID]?api_key=[API_KEY]&append_to_response=[MOVIE_PROPERTIES]`; //videos,images OR videos OR images
  movieDetailsURL = movieDetailsURL
    .split("[API_KEY]")
    .join(_apiKey)
    .split("[MOVIE_ID]")
    .join(_movieID);

  //Compose append_to_response from  MovieProperties array
  if (_movieProperties.length > 0) {
    movieDetailsURL = movieDetailsURL
      .split("[MOVIE_PROPERTIES]")
      .join(_movieProperties.join(","));
  }
  return movieDetailsURL;
}

//get all details of the movie using getMovieID()
function getMovieDetails(_apiKey, _movieID, _movieProperties = []) {
  if (!_apiKey) throw Error(`Valid APIKey must be passed : ${_apiKey}`);
  if (!_movieID) throw Error(`A valid movieID must be passed : ${_movieID}`);

  let movieDetailsURL = getMoviesDetailsURL(
    _apiKey,
    _movieID,
    _movieProperties
  );

  return new Promise((resolve, reject) => {
    fetch(movieDetailsURL)
      .then(res => {
        res
          .json()
          .then(_movieResult => {
            //If the movie array is empty search wasnt succesful
            if (!_movieResult)
              reject(
                Error(`Lookup for movie name ${movieID} didn't return results`)
              );
            //retrieve movie with highest relevance
            var {
              id: movieID,
              title,
              spoken_languages: [{ name: language }],
              overview: synopsis,
              videos: {
                results: [video]
              },
              images: { posters },
              genres,
              credits: { cast: castObjList },
              credits: { crew: crewObjList }
            } = _movieResult;

            //Extract the first poster meeting the width criterion
            let posterURL = null;
            posters.forEach(poster => {
              if (poster.height <= 1080) {
                posterURL = getMoviePosterURL(
                  poster.file_path.split("/").join(""),
                  500
                );
                return;
              }
            });

            //Stringfy the Generes
            let genresString = "";
            genres.forEach(genre => {
              genresString += `${genre.name}, `;
            });

            //Extract details of actors
            let leadActorsString = "";
            let castString = "";
            castObjList.forEach((castObj, index) => {
              castString = castString.concat(castObj.name, ", ");
              //add only top 4 actors as lead actors
              if (castObjList.length >= 4 && index < 4) {
                leadActorsString = leadActorsString.concat(castObj.name, ", ");
              }
            });

            var crew = { director: "", musicDirector: "" };

            //Identify crew
            crewObjList.forEach((_crew, index) => {
              switch (_crew.department) {
                case "Directing":
                  crew.director = crew.director.concat(_crew.name, ", ");
                  break;
                case "Sound":
                  crew.musicDirector = crew.musicDirector.concat(
                    _crew.name,
                    ", "
                  );
                  break;
              }
            });

            //Trim trailing commas - Need to find a way to do below with other properties
            crew.director = stripTrailingCommas(crew.director);
            crew.musicDirector = stripTrailingCommas(crew.musicDirector);
            //compose a partial movice object
            var movie = {
              movieID,
              title,
              language,
              synopsis,
              trailer: "",
              poster: posterURL,
              genres: stripTrailingCommas(genresString),
              cast: stripTrailingCommas(castString),
              leadActors: stripTrailingCommas(leadActorsString),
              crew
            };

            //resolve trailer link -- "Cleaner way to do this ?"
            if (
              !(video === undefined) &&
              !(video.site === undefined) &&
              video.site == "YouTube"
            ) {
              movie.trailer = `https://www.youtube.com/watch?v=${video.key}`;
            }

            resolve(movie);
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

//Construct movie poster URL
function getMoviePosterURL(_posterFile, _width) {
  if (!_width) throw Error(`Poster width must be specified : ${_width}`);
  if (!_posterFile)
    throw Error(`Poster file name must be specified : ${_posterFile}`);

  let posterURL = `https://image.tmdb.org/t/p/w[IMAGE_WIDTH]/[IMAGE_FILE_NAME]`;
  return posterURL
    .split("[IMAGE_WIDTH]")
    .join(_width)
    .split("[IMAGE_FILE_NAME]")
    .join(_posterFile);
}

//Retieve moive detals with helper functions
function retrieveMovie(apiKey, movieName, properties = []) {
  return new Promise((resolve, reject) => {
    getMovieID(apiKey, movieName)
      .then(movieid => {
        getMovieDetails(movieAPIKey, movieid, properties)
          .then(movie => {
            resolve(movie); // resolve promise with all movie details
          })
          .catch(err => {
            reject(
              `Error: Unable to retrieve Movie Details for ${movieName} with ID ${movieid}`
            );
          }); //getMovieDetails().catch()
      })
      .catch(err => {
        reject(`Error: Unable to retrieve Movie ID  for movie ${movieName}`);
      }); //getMovieID().catch()
  }); //return new Promise()
}

 //let testMovies = ["chekka chivantha vaanam", "venom", "minnale", "titanic"];
 //let testMovies = ["paw patrol", "cars", "rapunzel", "cinderella"];
let testMovies = ["Kadaikutty Singam"];
testMovies.forEach(movieitem => {
  retrieveMovie(movieAPIKey, movieitem, ["videos", "images", "credits"]).then(
    movie => {
      // console.log(JSON.parse(JSON.stringify(movie, null, "")));
      console.log(JSON.stringify(movie,null,2));
      //movie.json().then(jsonString => console.log(jsonString));
    }
  );
});
