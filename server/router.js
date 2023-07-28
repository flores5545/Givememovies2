const Router = require('koa-router');
const router = new Router();
const controller = require('./controllers/index');

// Should be able to filter by year, genre, max screen time... (INITIALLY)
router.get('/movies', controller.getMovies);




module.exports = router;