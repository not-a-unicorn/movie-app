"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("regenerator-runtime/runtime");

var mongoose = require("mongoose");
var tmdb = require("./tmdb");
mongoose.Promise = global.Promise;
var slug = require("slugs");

var Schema = mongoose.Schema;

//Movie
var movieSchema = new Schema((_ref = {
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   auto: true,
  //   required: true,
  //   index: true
  // },
  movieAPIID: {
    type: String,
    alias: "movieID"
  },
  title: {
    type: String,
    trim: true,
    required: "Must have movie title"
  },
  slug: String, //for browsing movie details directly
  language: { type: String },
  leadActors: [String],
  rating: Number,
  tags: [String],
  synopsis: String,
  trailer: String,
  genres: String,
  poster: String,
  backdrop: String
}, _defineProperty(_ref, "leadActors", [String]), _defineProperty(_ref, "cast", [String]), _defineProperty(_ref, "crew", {
  director: [String],
  musicDirector: [String]
}), _defineProperty(_ref, "sessions", {
  type: Schema.Types.ObjectId,
  ref: "Session"
}), _defineProperty(_ref, "created", {
  type: Date,
  default: Date.now
}), _defineProperty(_ref, "updated", {
  type: Date,
  default: Date.now
}), _ref));

// Define  indexes
movieSchema.index({
  title: "text"
});

// movieSchema.index({ synopsis: "text" });

function autopopulate(next) {
  this.populate("title");
  next();
}
movieSchema.pre("find", autopopulate);
movieSchema.pre("findOne", autopopulate);

// var __movie = movieSchema.statics
//   .createMovieByName("Kadaikutty Singam")
//   .then(__movie => {
//     console.log(__movie);
//   });

console.log("-------------in this file " + __filename);
// Export the model
//export default mongoose.model("Movie", movieSchema);
module.exports = mongoose.model("Movie", movieSchema);