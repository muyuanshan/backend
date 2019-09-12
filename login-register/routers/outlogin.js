//退出页面的路由
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx,next) => {
    ctx.session.userMessage = null;
   ctx.redirect('/confirm');
    // ctx.body = '111'
      next();
});

module.exports = router.routes();