//主入口的路由
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx,next) => {
    let parames = {
        title: '选择页'
    }
    ctx.body = `
    <a href='/confirm'>登录</a>
    <a href='/enroll'>注册</a>    
    `;
      next();
});

module.exports = router.routes();