import {Controller, RequestMapping} from '../../lib/koa-di-router.js';

@Controller
@RequestMapping('/chat')
export default class Chat{
  @RequestMapping('/index', 'GET')
  chatIndex(ctx) {
    console.log(111);
    ctx.body = 'chat.index'
  }
  @RequestMapping('/add', 'POST')
  addChat(ctx) {
    this.chat = '111';
    ctx.response.status = 200;
    ctx.response.message = 'success';
  }
  @RequestMapping('/add', 'GET')
  getChat(ctx) {
    console.log(222);
    ctx.body = 'get index122345123412345'
  }
}