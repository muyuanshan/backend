//登录成功的路由
const Router = require('koa-router');
const router = new Router();
const {handle,product} = require('../common');
const {addcontent} = require('../sql/sql')
const fs = require('fs');
const path = require('path');

router.get('/', async (ctx, next) => {
  let userMessage = ctx.session.userMessage;
  // console.log(userMessage);
  if (userMessage) {
    let parames = {
      title: '首页',
      header: userMessage.username,
    }
    await ctx.render('success', parames);
  }
     else {
       ctx.redirect('/confirm');
      // let parames = {
      //   title: '首页'
      // }
      // await ctx.render('success', parames);
     }
  next();
});

//子路由
router.post('/do', async (ctx, next) => {
  //取前端发来的参数  除了图片
  const { author = '', title = '', content = '' } = ctx.request.body
  //   console.log(ctx.request.files)  // 返回一个对象
  // ctx.request.files === ctx.request.body 都是一个对象
  // console.log(ctx.request.body)


  // 在这里我们去取图片的信息
  //   console.log(ctx.request.files['file-img']);
  //单张图片的时候是一个对象   多张图片的时候是一个数组   遍历这个数组
  // 这个里面的file 是指的是前端file的input中规定的 
  //     这是前段和后端规定的值  不能随便写 否则后端是拿不到的 

  // 获取图片的信息  然后处理图片的信息
  let file = ctx.request.files['file-img'];
  let userMessage = ctx.session.userMessage;
  // **** 多和单张图片的上传
  if (file) {
    //返回的数据
    let data = {
      author,
      title,
      content,
      images: [],
      id: userMessage.id,
      createtime: new Date().toLocaleDateString(),
    }
    //用原型来判断类型
    if (Object.prototype.toString.call(file) === '[object Object]') {
      let emptyArr = [];
      emptyArr.push(file);
      file = emptyArr;
      //只有一张图片的时候，我们也是一个数组，包着对象
    }
    file.forEach(ele => {
      let render = fs.createReadStream(ele.path);
      let filePath = path.join('static/upload/images', `${ele.name}`);
      let upStream = fs.createWriteStream(filePath);
      render.pipe(upStream);
       
      //ctx.origin 指的是协议加端口加域名
      let handelPath = filePath.split('\\');
      let url = ctx.origin + '/' + path.join(handelPath.slice(1,handelPath.length).join('/')).split('\\').join('/');
    // console.log(url); 
      // let newU = path.normalize(url);     
      data.images.push({
        size: ele.size,
        name: ele.name,
        type: ele.type,
        url,
      })
    });
    await addcontent(data);
    ctx.body = product({
      status: 200,
      err: '',
      data,
    })
  }
  // ctx.body = product(data);

  //  **** 单张图片的上传  *****
  //通过引入fs的模块 通过流去读
  // let render =  fs.createReadStream(file.path);

  //   console.log(render);   //返回是一个阅读的流  拿到一个路径

  //  let filePath = path.join('static/upload/images/', `/${file.name}`);
  // 合并路径  把图片给保存在我们设置好的路径里面
  //  console.log(filePath);

  //  let upStream = fs.createWriteStream(filePath)
  //此时是写入的一个流  路径的里面的文件夹是不会自动创建的 需要手动创建
  //这里写入的文件的路径应该我们要存的图片的的路径

  //图片已经下载好了 但是图片打不开 所以需要一个管道把流给传入进去

  //  render.pipe(upStream);    
  // 后端就可以拿到这张图片
  next();
})
module.exports = router.routes();