
const Router = require('koa-router')
const User = require('../app/controllers/user')
const Post = require('../app/controllers/post')
const Column = require('../app/controllers/column')
const Upload = require('../app/controllers/upload')
const AppData = require('../app/controllers/appData')
const Anime = require('../app/controllers/anime')
const Application = require('../app/controllers/application')
const path = require('path')
module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })
  /**
   * user模块
   */
  //用户注册
  router.post('/users',User.signup)
  //用户登录
  router.post('/user/login',User.login)
  //更新用户信息
  router.patch('/user/:id',User.update)
  //获取当前用户信息
  router.get('/user/current',User.getUserByToken)
  /**
   * post模块
   */
  //添加文章
  router.post('/posts',Post.insert)
  //获取文章
  router.get('/posts/:id',Post.getPostById)
  //更新文章
  router.patch('/posts/:id',Post.updatePost)
  //删除文章
  router.delete('/posts/:id',Post.deletePost)

  /**
   * column模块
   */
  //更新专栏信息
  router.patch('/columns/:id',Column.updateColumn)
  //获取一个专栏详情
  router.get('/columns/:id',Column.getColumnDetails)
  //获取专栏列表
  router.get('/columns',Column.getAllColumns)
  //获取专栏所有post
  router.get('/columns/:id/posts',Column.getCloumnPosts)

  /**
   * uoload
   */
  router.post('/upload',Upload.single('file'),async (ctx) => {
    console.log(ctx.req.file);
    // ctx.body = ctx.request.body;
    let paths = ctx.req.file.path.split('\\')
    console.log(paths)
    let url = `http://localhost:3000/${paths[1]}/${paths[2]}`
    ctx.body = {
      code:0,
      msg:'上传成功',
      data: {
        _id:url,
        url:url
      }
    }
  });

  /**
   * application
   */
  router.get('/application',Application.getAppInfo)
  router.get('/application/garbage',AppData.getGarbageClass)
  router.get('/application/ident',AppData.parseId)
  router.get('/application/anime',Anime.getAnimeInfo)
  router.get('/application/getIpInfo',AppData.getIpinfo)

  /**
   * 管理员
   */
  router.get('/manage/user',User.getUserList)
  router.get('/manage/post',Column.getAllPost)
  router.delete('/manage/user/:id',User.deleteUser)
  return router
}