const {movieFinderByID, movieFinder} = require('../APIs/TMDB');

const default_prompt = "I want to watch a scifi movie with tom cruise which is less than 2 hours";

async function getMovies(ctx) {
  try {
    ctx.body = await movieFinder(ctx.request.body.prompt || default_prompt);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
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
    ctx.body = err;
  }
}


module.exports = {getMovies, getMoviesByID};