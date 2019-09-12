//登录页面的路由
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx,next) => {
    let parames = {
        title: '登录页'
    }
    await ctx.render('confirm', parames);
    // ctx.body = '111'
      next();
});

module.exports = router.routes();