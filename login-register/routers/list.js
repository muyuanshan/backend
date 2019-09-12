//列表路由
const Router = require('koa-router');
const router = new Router();
const {getContent,delContent,getC} = require('../sql/sql')
const {product} = require('../common');


router.get('/', async (ctx,next) => {
    // ctx.body = '111';
    let userMessage = ctx.session.userMessage;
    if (userMessage) {
      let parames = {
        title: '列表页',
        header: userMessage.username,
        data:  await getContent(userMessage.id),
      }
      // console.log(parames.data);
      await ctx.render('list', parames);
    }
       else {
         ctx.redirect('/confirm');
       }
      next();
});

router.post('/del', async(ctx, next) => {
  // console.log(ctx.request.body);
  let {id} = ctx.request.body;
  if(await delContent(id)) {
       ctx.body = product();
  }else {
    ctx.body = product({
      status: 0,
      err: '删除失败',
    })
  }
  next();
})

router.post('/mod', async(ctx, next) => {
  // console.log(ctx.request.body);
     ctx.redirect('/success');
    //  ctx.body =  product();
  next();
})




router.post('/datalist', async(ctx, next) => {
  let result = await getC();
  if(result.length>0) {
    let parames = {
        status:200,
        err: 0,
        data: result
    }
    ctx.body = product(parames);
  }
})
router.options('/datalist', async(ctx, next) => {
  ctx.body = '';
})




//验证axios
// router.options('/axios', (ctx, next) => {
//   ctx.body = '';
// })

router.post('/axios', (ctx, next) => {
  let parames = {
    status:200,
    err: 0,
    data: {
      user: 11,
      pwd: 222
    }
}
ctx.body = product(parames);
  next();
})


router.post('/axiosRegister', (ctx, next) => {
  let parames = {
    status:100,
    err: 0,
    data: {
      user: 3333,
      pwd: 4444
    }
}
ctx.body = product(parames);
  next();
})

module.exports = router.routes();