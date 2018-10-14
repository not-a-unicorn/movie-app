"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var slug = require("slugs");

var Schema = mongoose.Schema;

//Movie
var movieSchema = new Schema((_ref = {
  _id: {
    type: Schema.ObjectId,
    auto: true
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
  poster: String,
  backdrop: String
}, _defineProperty(_ref, "leadActors", [String]), _defineProperty(_ref, "cast", [String]), _defineProperty(_ref, "crew", {
  director: [String],
  musicDirector: [String]
}), _defineProperty(_ref, "sessions", {
  type: mongoose.Schema.ObjectId,
  ref: "Session"
}), _defineProperty(_ref, "created", {
  type: Date,
  default: Date.now
}), _defineProperty(_ref, "Update", {
  type: Date,
  default: Date.now
}), _ref));

// Define  indexes
movieSchema.index({
  title: "text",
  language: "text"
});

movieSchema.index({ synopsis: "text" });

function autopopulate(next) {
  this.populate("title");
  next();
}
movieSchema.pre("find", autopopulate);
movieSchema.pre("findOne", autopopulate);

// Export the model
module.exports = mongoose.model("Movie", movieSchema);