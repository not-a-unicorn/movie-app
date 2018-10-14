var { retrieveMovie } = require(".././tmdb");

require("dotenv").config({ path: __dirname + "/.env" });
const fs = require("fs");

const mongoose = require("mongoose");
const dbURI =
  process.env.DB_URI ||
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }/${process.env.DB_NAME}`;
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models - they need to be imported only once
const movie = require("../movie.model");

function deleteData() {
  console.log("😢😢 Goodbye Data...");

  movie.remove().then(reponse => {
    console.log(`Data removed. Reponse ${response}`);
  });

  console.log(
    "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
  );
  process.exit();
}

function loadData() {
  try {

    retrieveMovie("5066229b476a9c157a74692454f7661e", "venom", [
      "videos",
      "images",
      "credits"
    ]).then(_movie => {
      //Add dummy sesions
      let sessions = [
        new Session({
          _sesionid: new mongoose.Types.ObjectId(),
          state: "VIC",
          location: "Dandenong",
          cinema: "Event",
          sessionDateTime: ["27/09/2018 18:00"],
          ticketLink:
            "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9035777&bookingSource=www|sessions"
        }),
        new Session({
          _sesionid: new mongoose.Types.ObjectId(),
          state: "NSW",
          location: "Liverpool ",
          cinema: "Event Cinemas",
          sessionDateTime: [
            "27/09/2018 18:00",
            "27/09/2018 21:00",
            "27/09/2018 15:00"
          ],
          ticketLink:
            "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9035777&bookingSource=www|sessions"
        }),
        new Session({
          _sesionid: new mongoose.Types.ObjectId(),
          state: "ACT",
          location: "Canberra",
          cinema: "Event",
          sessionDateTime: ["27/09/2018 18:00"],
          ticketLink:
            "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9035777&bookingSource=www|sessions"
        })
      ]; //New Session

      //Movie
      let movie = new Movie({
        title: _movie.title,
        language: _movie.languages,
        synopsis: _movie.plot,
        trailer: _movie.trailer,
        poster: _movie.poster,
        leadActors: _movie.leadActors,
        cast: _movie.cast,
        crew: {
          director: _movie.crew.director,
          musicDirector: _movie.crew.musicDirector
        },
        sessions: sessions
      }); //new Movie
      console.log(_movie.director);
      movie.save(function(err) {
        if (err) {
          //return next(err);
          console.log(`Error occured in saving movie ${movie.title} ${err}`);
          res.send(`{Error : ${e}`);
        }
      });
    });
    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
