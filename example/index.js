import Koa from 'koa';
import {Router} from '../lib/koa-di-router.js';

import './controller/chat';

const app = new Koa();
const router = new Router();

app.use(router.route())
app.listen(3001);