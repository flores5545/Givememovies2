const Router = require('koa-router');
const router = new Router();
const controller = require('./controllers/index');


router.get('/', controller.getMovies);
router.post('/', controller.getMovies);

router.get('/id', controller.getMoviesByID);
router.post('/id', controller.getMoviesByID);


module.exports = router;