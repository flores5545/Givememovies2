const model = require("../models/index");


async function getMovies(ctx) {
  try {
    ctx.body = await model.find({});
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    console.log(err)
  }
}


module.exports = {getMovies}