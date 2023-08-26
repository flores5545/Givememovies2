const { movieFinderByID } = require('../APIs/TMDB');
const { movieFinder } = require('../APIs/TMDB');

async function getMovies (ctx) {
  try {
    ctx.body = await movieFinder(ctx.request.body.prompt);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    console.log(err);
  }
}

async function getMoviesByID (ctx) {
  try {
    ctx.body = await movieFinderByID(ctx.request.body.id);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    console.log(err);
  }
}

module.exports = { getMovies, getMoviesByID };
