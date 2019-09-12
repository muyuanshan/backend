//汇总路由的页面
const Router = require('koa-router');
const router = new Router();

//引入分路由
const confirm = require('./routers/confirm');
const enroll = require('./routers/enroll');
const enter = require('./routers/enter');
const login = require('./routers/login');
const success = require('./routers/success');
const list = require('./routers/list');
const outlogin = require('./routers/outlogin');


// 注册分路由
router.use('/', enter);
router.use('/confirm', confirm);
router.use('/enroll', enroll);
router.use('/confirm/login', login);
router.use('/success', success);
router.use('/list', list);
router.use('/outlogin', outlogin);

module.exports = router;