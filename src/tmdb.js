//@Theepan Thevathasan
//11Oct 2018
//Retrives movies from TMDB
require("isomorphic-fetch");
//API Access Key for  themoviedb.org
let movieAPIKey = "5066229b476a9c157a74692454f7661e";

function getMovieID(_apiKey, _movieName) {
  //Construct movie lookup URL
  if (!_apiKey) throw Error(`Valid APIKey must be passed : ${_apiKey}`);
  if (!_movieName) throw Error(`Movie name must be passed : ${_movieName}`);

  let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&query=[MOVIE_NAME]&page=1&include_adult=true`;
  searchURL = searchURL
    .split("[API_KEY]")
    .join(_apiKey)
    .split("[MOVIE_NAME]")
    .join(_movieName);

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
//Construct movie details lookup URL
function getMovieDetails(_apiKey, _movieID, _movieProperties = []) {
  if (!_apiKey) throw Error(`Valid APIKey must be passed : ${_apiKey}`);
  if (!_movieID) throw Error(`MovieID  must be passed : ${_movieID}`);

  let movieDetailsURL = `https://api.themoviedb.org/3/movie/[MOVIE_ID]?api_key=[API_KEY]&append_to_response=[MOVIE_PROPERTIES]`; //videos,images OR videos OR images
  movieDetailsURL = movieDetailsURL
    .split("[API_KEY]")
    .join(_apiKey)
    .split("[MOVIE_ID]")
    .join(_movieID);

  if (_movieProperties.length > 0) {
    movieDetailsURL = movieDetailsURL
      .split("[MOVIE_PROPERTIES]")
      .join(_movieProperties.join(","));
  }

  return new Promise((resolve, reject) => {
    fetch(movieDetailsURL)
      .then(res => {
        res
          .json()
          .then(movie => {
            //If the movie array is empty search wasnt succesful
            if (!movie)
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
              genres
            } = movie;

            //var {videos:{results:[video]}} = movie
            //var {videos:{results:[video]}} = movie
            //var {key: videoKey, site: videoSite}= video

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

            //concatenate Youtube results //TODO: implement other video sites
            function videoURL() {
              return video.site == "YouTube"
                ? `https://www.youtube.com/watch?v=${video.key}`
                : `Video site : ${video.site} video key : ${video.key}`;
            }

            //Stringfy the Generes
            genresString = "";
            genres.forEach(genre => {
              genresString += `${genre.name}, `;
            });


            //compose a partial movice object
            var _movie = {
              movieID,
              title,
              language,
              synopsis,
              trailer: videoURL(),
              poster: posterURL,
              genres: genresString.replace(/,\s*$/, "")
            };

            console.log(_movie);
            resolve(_movie);
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

// 1. Load the configuration

// 3. Look up additional trailer and poster info

function retrieveMovie(apiKey = null, movieName, properties = []) {
  getMovieID(movieAPIKey, "venom")
    .then(movieID => {
      getMovieDetails(movieAPIKey, movieID, properties)
        .then(data => console.log(data))
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

retrieveMovie("alien", null, ["videos", "images"]);
//module.exports = retrieveMovie;

// console.log(getMovieSearchURL("ABC123", "padam"));
// console.log(getMovieDetailsURL("ABC123", 123354, ["video", "poster"]));
// console.log(getMoviePosterURL("filename.png", 400));
