//登录页面的路由
const Router = require('koa-router');
const router = new Router();
const {getUser} = require('../sql/sql');  //引入数据库返回的对象 并解构
const {handle,product} = require('../common');
router.post('/', async(ctx,next) => {
    let data = ctx.request.body;    //前端发回来的数据
    let result = await getUser(data);
   if( result.length > 0) {
     ctx.session.userMessage = {
       username: data.username,
       id: result[0].id
     }
      ctx.body = product();
      // console.log(product())
   }else {
    ctx.body = product({
      status: 0,
      err: '用户名或密码不正确'
    });     
   }
    next();  
});

module.exports = router.routes();