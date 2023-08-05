const Router = require('koa-router');
const router = new Router();
const controller = require('./controllers/index');


router.post('/', controller.getMovies);
router.get('/id', controller.getMoviesByID);


module.exports = router;