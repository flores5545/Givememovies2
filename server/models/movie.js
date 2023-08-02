const mongoose = require('./db.js')

const movieSchema = new mongoose.Schema({
  'title': String,
  'poster_path': String,
  'id': String
});

const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;