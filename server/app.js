const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

//静态资源配置
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const router1 = new Router()
const staticpath = './files'
app.use(static(
    path.join(__dirname,staticpath)
))
router1
    .get('/',(ctx,next)=>{
        ctx.body= path.join(__dirname,staticpath)
    })
app
.use(router1.routes())
.use(router1.allowedMethods())

//  数据库引入

const fs = require('fs')
const mongoose = require('mongoose')
const db1 = 'mongodb://localhost:27017/LearnCom'
/**
 * mongoose连接数据库
 * @type {[type]}
 */
 mongoose.Promise = require('bluebird')
 mongoose.connect(db1,{useNewUrlParser:true,useUnifiedTopology: true})

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
   console.log('数据库连接成功')
 });
 const models_path = path.join(__dirname, '/app/models')
/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
 var walk = function(modelPath) {
  fs.readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)
//引入jwt验证
const koaJwt = require('koa-jwt')
const UserCon = require('./app/controllers/user')
// app.use(
//   koaJwt({
//       secret: 'my_app_secret'
//   }).unless({
//       path: [/^\/api\/user\/login/, /^\/users/]
//   })
// );
// app.use(UserCon.checkToken)
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  multipart: true
}))
app.use(json())

//解决跨域
// app.use(
//   cors({
//       origin: function(ctx) { //设置允许来自指定域名请求
//           if (ctx.url === '/test') {
//               return '*'; // 允许来自所有域名请求
//           }
//           return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
//       },
//       maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//       credentials: true, //是否允许发送Cookie
//       allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'], //设置所允许的HTTP请求方法
//       allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//       exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//   })
// );
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  // ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const router = require('./config/router')()
app.use(router.routes(), router.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
