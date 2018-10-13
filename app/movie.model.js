"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Movie Sessions
var SessionSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  state: { type: "String" },
  location: { type: "String" },
  cinema: { type: "String" },
  sessionDateTime: ["String"],
  ticketLink: { type: Schema.Types.String }
});

//Movie
var MovieSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  title: { type: "String", required: [true, "must have movie title"] },
  language: { type: "String" },
  synopsis: { type: "String" },
  trailer: { type: "String" },
  poster: { type: "String" },
  leadActors: { type: "String" },
  cast: { type: "String" },
  crew: {
    director: { type: "String" },
    musicDirector: { type: "String" }
  },
  sessions: {
    type: [SessionSchema]
  }
});

// Export the model
//module.exports = mongoose.model("Movie", MovieSchema);
module.exports = {
  Movie: mongoose.model("Movie", MovieSchema),
  Session: mongoose.model("Session", SessionSchema)
};