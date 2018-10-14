const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const Schema = mongoose.Schema;

//Movie
var movieSchema = new Schema({
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
  backdrop: String,
  leadActors: [String],
  cast: [String],
  crew: {
    director: [String],
    musicDirector: [String]
  },
  sessions: {
    type: mongoose.Schema.ObjectId,
    ref: "Session"
  },
  created: {
    type: Date,
    default: Date.now
  },
  Update: {
    type: Date,
    default: Date.now
  }
});

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
