//import { Movie } from "./movie.model";
var Movie = require("../models/movie.model");
var Session = require("../models/session.model");
var Cinema = require("../models/cinema.model");
var bodyParser = require("body-parser");
const helper = require("../helpers/helpers");

//Check if app is running on DEV

export async function isDevEnvironment(req, res, next) {
  // first check if the user is authenticated
  if (helper.getAppMode() == "DEV") {
    next(); //carry out the Test Data tasks
    return;
  }

  handleResponse({
    reponse: res,
    status: "error",
    message:
      "You are now on PROD. Set NODE_ENV=development before loading/deleting test data"
  });
}

export async function deleteTestData(req, res) {
  try {
    await Movie.deleteMany();
    await Session.deleteMany();
    await Cinema.deleteMany();
    handleResponse({
      reponse: res,
      status: "success",
      message: "Successfully deleted the test data"
    });
  } catch (error) {
    handleResponse({
      reponse: res,
      status: "error",
      message: `failed to delete test data. Error : ${error.message}`
    });
  }
}

export async function createTestData(req, res) {
  var path = require("path");
  var fs = require("fs");

  try {
    //Delete old test data to avoid conflicts

    await Movie.deleteMany();
    await Session.deleteMany();
    await Cinema.deleteMany();

    //Load new test data
    var sampleDataDir = path.join(__dirname, "./../data/");
    console.log(sampleDataDir);
    console.log(path.join(sampleDataDir, "_sessions.json"));

    var movies = JSON.parse(
      fs.readFileSync(sampleDataDir + "_movies.json", "utf-8")
    );
    var sessions = JSON.parse(
      fs.readFileSync(sampleDataDir + "_sessions.json", "utf-8")
    );
    var cinemas = JSON.parse(
      fs.readFileSync(sampleDataDir + "_cinemas.json", "utf-8")
    );

    await Movie.insertMany(movies);
    await Session.insertMany(sessions);
    await Cinema.insertMany(cinemas);

    handleResponse({
      reponse: res,
      status: "success",
      message: `deleted existing data and created a new set`
    });
  } catch (error) {
    handleResponse({
      reponse: res,
      status: "error",
      message: `Failed in deleting the  existing data and creating a new set. Error : ${
        error.message
      }`
    });
  }

  //res.status(200).json({ message: "Sample Data Loaded " });
}

//TODO refactor this helper method after movie controller
function handleResponse({ reponse, status, message = "", content = [] }) {
  //http Status
  let httpStatus = status == "success" ? 200 : 500;

  //Set override message if no message passed
  if (!message) {
    if (status == "success") {
      message =
        content.length > 0
          ? "Successfully retrieved movies"
          : "No movies available for the specified criteria";
    } else if (status == "error") {
      message = "Failure occured in retrieving movies";
    }
  }

  const obj = { status, message, content };
  reponse.status(httpStatus).json(obj);
}
