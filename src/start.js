
// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

// Set up mongoose connection - Specfic URI in Environment variables takes precedence
// Connect to our Database and handle any bad connections
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

// import all of our models
require("./movie.model"); 

// Start our app!
const app = require("./app");
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Movie-App Serverside started on  → PORT ${server.address().port}`);
});
