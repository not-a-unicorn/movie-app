// @gokuvinoth
// 03/Oct/2018 Initial Draft
// 07/Oct/2018 modified as per the comments to simply code
// to retrive the movie list from api and display in the app.html

// Calling the movie result api

const xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    // console.log(xhr.response);
    // function call to process api result
    displayResult(xhr.response);
  }
};
// url to call api
xhr.open("GET", "https://salty-sea-40504.herokuapp.com/movies");
xhr.send();

const displayResult = response => {
  let responseDataArry = response;
  // console.log(responseDataArry[0]);

  let movieElement = "";
  //   looping to create elements for number of items returned
  responseDataArry.forEach(function(responseData) {
    movieElement =
      movieElement +
      `<div class="movie">
    <h2 class="movie-title" id="movietitle">${responseData.title}</h2>
    <img class="movie-poster" id="movieposter" src="${
      responseData.poster
    }" alt="hero and heroine">
    <ul class="movie-info" id="movieinfo">
        <li class="movie-show-time" id=movieshowtime><a class="movie-more-info" id="moviemoreinfo" href="#">${
          responseData.sessions[0].sessionDateTime[0]
        }</a></li>
        <li class="movie-language" id="movielanguage">${
          responseData.language
        }</li>
    </ul>
</div>`;

    // console.log(movieElement);
  });
  //   create final element and append to display the full content in HTML
  let resultElement = document.querySelector("#movies");
  resultElement.innerHTML = movieElement;
};
