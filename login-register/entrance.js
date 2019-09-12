//引入文件
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const views = require('koa-views');
const path = require('path'); 
// const bodyParser = require('koa-bodyparser');
// app.use(bodyParser());
const body = require('koa-body');  // 支持文件的上传

const session = require('koa-session');


//引入主路由
const router = require('./routers');


//注册使用
app.use(static(path.join(__dirname, 'static')));   
app.use(views(path.join(__dirname, 'views'), {
    extension: 'ejs',
}))

app.keys = ['koa-web-site'];
app.use(session({
    // cookie的key 默认是koa: sess
    key: 'koa: sess',
    // sesstion的过期时间
    maxAge: 120000,
    //自动提交到响应头
    autoCommit: true,
    // 是否允许重写
    overwrite: true,
    //httpOnly  js脚本将无法读取到cookie，有效防止了xss攻击
    httpOnly: true,
    //是否签名
    signed: true,
    //是否每次响应时刷新session的有效期
    rolling: true,
    //是否在sessi快过期的时候刷新有效期
    renew: false
}, app))

// 设置跨域  用async去异步
app.use(async (ctx, next) => {
    // 设置CORS跨域
    // CORS是跨域资源共享
    // *允许所有请求跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    // 设置允许的请求方式
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    // 设置请求头信息
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    await next();
})

app.use(body({
    //允许上传多个文件
    multipart: true,
    formidable: {
        //上传文件的大小，默认是2m
        maxFieldsSize: 200 * 1024 * 1024
    }
}))

//注册路由   放到最后面
app.use(router.routes());  


//启动服务
app.listen(8080, err => {
    !err && process.stdout.write('服务启动成功');
});
