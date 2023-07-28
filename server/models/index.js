const mongoose = require('../db.js');

const MovieSchema = new mongoose.Schema({
  "title": String,
  "date": Date,
  "venue": String,
});

const Movie = mongoose.model('Movie', MovieSchema);


module.exports = Event;