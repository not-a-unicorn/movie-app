const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//Movie Sessions
let sessionSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  sessionDateTime: {
    type: [Date],
    required: "Session must have a date and time "
  },
  ticketLink: String,

  sessions: {
    type: mongoose.Schema.ObjectId,
    ref: "Cinema"
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

// Export the model
module.exports = mongoose.model("Session", sessionSchema);
