//注册页面的路由
const Router = require('koa-router');
const router = new Router();
const {getUser, enrollUser, oldUser} = require('../sql/sql');  //引入数据库返回的对象 并解构
const {handle,product} = require('../common');

router.get('/', async (ctx,next) => {
    let parames = {
        title: '注册页'
    };
      await ctx.render('enroll', parames);   
      next();
});

router.post('/', async (ctx,next) => {
     let data = ctx.request.body;
     if(await oldUser(data) === 1) {
         ctx.body = product({
             status:0,
             err:'此用户已被注册'
         })
     }
     else {
        enrollUser(data);
        ctx.body = product();
     }
});
module.exports = router.routes();