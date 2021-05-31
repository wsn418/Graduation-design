const mongoose = require('mongoose')
const { post } = require('superagent')
const { toJSON } = require('../../app')

var User = mongoose.model('t_users')
var Column = mongoose.model('t_columns')
var Post = mongoose.model('t_posts')
/** 
 * 创建文章
*/
exports.insert = async(ctx,next) => {
  const body = ctx.request.body
  let post = new Post({
    title:body.title,
    content:body.content,
    image:body.image || null,
    column:body.column,
    author:body.author
  })
  let user = await User.findOne({
    _id:post.author
  })
  let column = await Column.findOne({
    userId:user._id
  })
  try{
    post = await post.save(post)
    ctx.body = {
      code:0,
      msg:'操作成功',
      data:{
        _id:post._id,
        title:post.title,
        excerpt:post.content.length > 30? post.content.substring(0,30)+'..':post.content,
        content:post.content,
        image:{
          url:post.image
        },
        author:{
          _id:user._id,
          email:user.email,
          nickName:user.nickName,
          description:user.description?user.description:"",
          avator:user.avator?user.avator:"",
          column:column?column._id:null,
          createdAt:user.meta.createAt
        },
        createdAt:post.meta.createAt,
        column:column?column._id:null
      }
    }
  }
  catch(e){
    console.log('e',e)
    ctx.body = {
      code:1,
      msg:e
    }
  }
  return next
}

/** 
 * 获取文章
*/
exports.getPostById = async(ctx,next) => {
  let params = ctx.params
  let post = await Post.findOne({
    _id:params.id
  })
  let user = await User.findOne({
    _id:post.author
  })
  let column = await Column.findOne({
    userId:user._id
  })
  ctx.body = {
      code:0,
      msg:'操作成功',
      data:{
        _id:post._id,
        title:post.title,
        excerpt:post.content.length > 30? post.content.substring(0,30)+'..':post.content,
        content:post.content,
        image:{
          url:post.image
        },
        author:{
          _id:user._id,
          email:user.email,
          nickName:user.nickName,
          description:user.description?user.description:"",
          avator:user.avator?user.avator:"",
          column:column?column._id:null,
          createdAt:user.meta.createAt
        },
        createdAt:post.meta.createAt,
        column:column?column._id:null
      }
    }
}

/** 
 * 更新文章
*/
exports.updatePost = async(ctx,next) => {
  const params = ctx.params
  const body = ctx.request.body
  let post = await Post.findOne({
    _id:params.id
  })
  console.log('post', post)
  const fields = 'title,content,image'.split(',')
  fields.forEach((field) => {
    if(body[field]){
      post[field] = body[field]
    }
  })
  console.log('post-------------------', post)
  post = await post.save(post)
  let user = await User.findOne({
    _id:post.author
  })
  let column = await Column.findOne({
    userId:user._id
  })
  console.log(column)
  ctx.body = {
    code:0,
    msg:'操作成功',
    data:{
      _id:post._id,
      title:post.title,
      excerpt:post.content.length > 30? post.content.substring(0,30)+'..':post.content,
      content:post.content,
      image:{
        url:post.image
      },
      author:{
        _id:user._id,
        email:user.email,
        nickName:user.nickName,
        description:user.description?user.description:"",
        avator:user.avator?user.avator:"",
        column:column?column._id:null,
        createdAt:user.meta.createAt
      },
      createdAt:post.meta.createAt,
      column:column?column._id:null
    }
  }
}

/**
 * 删除文章
 */

exports.deletePost = async(ctx,next) => {
  const params = ctx.params
  let post = await Post.findOne({
    _id:params.id
  })
  try{
    post = await post.delete()
    ctx.body = {
      code:0,
      msg:'删除成功'
    }
  }catch(e){
    ctx.body = {
      code:1,
      msg:'删除失败'
    }
  }
}


/**
 * 格式化文章返回值
 */

exports.formatPost = async(id) => {
  let params = id
  let post = await Post.findOne({
    _id:params
  })
  let user = await User.findOne({
    _id:post.author
  })
  let column = await Column.findOne({
    userId:user._id
  })
  return {
    _id:post._id,
    title:post.title,
    excerpt:post.content.length > 30? post.content.substring(0,30)+'..':post.content,
    content:post.content,
    image:{
      url:post.image
    },
    author:{
      _id:user._id,
      email:user.email,
      nickName:user.nickName,
      description:user.description?user.description:"",
      avator:user.avator?user.avator:"",
      column:column?column._id:null,
      createdAt:user.meta.createAt
    },
    createdAt:post.meta.createAt,
    column:column?column._id:null
  }
}