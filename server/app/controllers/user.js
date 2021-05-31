const mongoose = require('mongoose')
const Crypto = require('crypto')
var User = mongoose.model('t_users')
var Column = mongoose.model('t_columns')
const Jwt = require('jsonwebtoken')
const secret = 'my_app_secret'
const UserHelper = require('../dbhelper/userHelp')
/**
 * 注册新用户
 */
exports.signup = async (ctx, next) => {
  let email = ctx.request.body.email
  let nickName = ctx.request.body.nickName
  let password = ctx.request.body.password
  var user = await User.findOne({
    email: email
  }).exec()
  if (user) {
    ctx.body = {
      success: false,
      message: '用户已经存在'
    }
    return next
  }
  if (!user) {
    user = new User({
      nickName: nickName,
      email: email,
      password: Crypto.createHash('md5').update(password).digest('hex')
    })
  }
  try {
    const fields = 'description,avatar,column,createdAt'.split(',')
    fields.forEach((field) => {
      if(!user[field]) {
        user[field] = ''
      }
    })
    user = await user.save()
    console.log('user', user)
    var column = new Column({
      userId : user._id,
      title:user.nickName+'的专栏',
      description:'还未添加描述~'
    })
    ctx.body = {
      code:0,
      msg:'注册成功',
      data:{
        _id:user._id,
        email:user.email,
        nickName:user.nickName,
        description:user.description?user.description:"",
        avatar:user.avatar?user.avatar:"",
        column:column._id,
        createdAt:user.meta.createAt
      }
    }
    console.log('column', column)
    column = await column.save()
  } catch (e) {
    console.log('error',e)
    ctx.body = {
      success: false,
      error: e
    }
    return next
  }
}

/** 
 * 登录
*/
exports.login = async (ctx, next) => {
  let email = ctx.request.body.email
  let password = Crypto.createHash('md5').update(ctx.request.body.password).digest('hex')
  console.log('password',password)
  var user = await User.findOne({
    email: email,
    password: password
  })
  if (user) {
    const payload = {user_name:user.nickName,id:user._id,email:user.email}
    const token = Jwt.sign(payload,secret,{expiresIn:'24h'});
    ctx.body = {
      code: 0,
      msg: '登录成功',
      data: {
        token: token
      }
    }
  } else {
    ctx.status = 404
    ctx.body = {
      code: 404,
      error: '该用户不存在或者密码错误',
    }
  }
  return next

}

/**
 * 更新用户信息
 */
exports.update = async(ctx, next) => {
  const _id = ctx.params.id
  var user = await User.findOne({
    _id:_id
  })
  const body = ctx.request.body
  const fields = 'email,nickName,description,avatar,column'.split(',')
  fields.forEach((field) => {
    if(body[field]) {
      user[field] = body[field]
    }
  })
  user = await user.save()
  ctx.body = {
    code:'0',
    msg:'更新成功',
    data:{
      _id:user._id,
      email:user.email,
      nickName:user.nickName,
      description:user.description,
      avatar:user.avatar
    }
  }
}

/**
 * 检查token
 */

 exports.checkToken = (ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, secret.sign, {
            complete: true
          });
        } catch (error) {
          //token过期 生成新的token
          const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          ctx.res.setHeader('Authorization', newToken);
        }
      }
    }
  }

  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body =
        'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }});
 }

 /**
  * 根据token获取用户信息
  */
exports.getUserByToken = async (ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
          //jwt.verify方法验证token是否有效
        let payload  =  Jwt.verify(token, secret);
        console.log('payload',payload)
        let user = await User.findOne({
          _id:payload.id
        })
        ctx.body = {
          code:0,
          msg:'获取成功',
          data:{
            _id:user._id ,
            email:user.email,
            nickName:user.nickName,
            description:user.description?user.description:"",
            avatar:user.avatar?user.avatar:"",
            column: await (await Column.findOne({userId:user.id})).id,
            createdAt:user.meta.createAt
          }
        }  
        }
      }
    }
}

/**
 * 获取用户列表
 */
exports.getUserList = async (ctx, next) => {
  const params = ctx.query
  console.log(ctx.query.currentPage,ctx.query.pageSize)
  const res = await UserHelper.getUserList(params.currentPage-1,params.pageSize)
  ctx.body = {
    code:0,
    data:res
  }
}
/**
 * 删除用户信息
 */
exports.deleteUser = async (ctx,next) => {
  const id = ctx.params.id
  console.log('ctx---------',id)
  let user = await User.findOne({
    _id:id
  })
  console.log('user',user)
  try{
    user = await user.delete()
    ctx.body = {
      code:0,
      msg:'删除成功'
    }
  }catch(e){
    console.log('error',e)
    ctx.body = {
      code:1,
      msg:'删除失败'
    }
  }
}