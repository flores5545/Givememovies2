const {movieFinderByID} = require('../APIs/TMDB');
const {movieFinder} = require('../APIs/TMDB');

//const prompt = "I want to watch a scifi movie with tom cruise which is less than 2 hours";

async function getMovies(ctx) {
  try {
    ctx.body = await movieFinder(ctx.request.body.prompt);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    console.log(err);
  }
}


async function getMoviesByID(ctx) {
  try {
    console.log(ctx.request.body.id);
    ctx.body = await movieFinderByID(ctx.request.body.id)
    console.log(ctx.body);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    console.log(err)
  }
}


module.exports = {getMovies, getMoviesByID};