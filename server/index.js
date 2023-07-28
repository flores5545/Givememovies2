const Koa = require('koa');
const router = require("./router");
const bodyParser = require("koa-bodyparser");
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => console.log('Server is listening on port 3000'));