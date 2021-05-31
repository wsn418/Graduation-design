const mongoose = require('mongoose')
var User = mongoose.model('t_users')
var Post = mongoose.model('t_posts')
var Column = mongoose.model('t_columns')
const ColumnHelper = require('../dbhelper/columnHelp')
const PostCon = require('./post')
/**
 * 更新单个专栏信息
 */

exports.updateColumn = async(ctx,next) => {
  let body = ctx.request.body
  let params = ctx.params
  let column = await Column.findOne({
    _id:params.id
  })
  let fields = 'title,description,avatar'.split(',')
  fields.forEach(field => {
    if(body[field]) {
      column[field] = body[field]
    }
  })
  try{
    column = await column.save()
    ctx.body = {
      code:0,
      msg:'修改成功',
      data: await this.formatColumn(column._id)
    }
  }catch(e){
    ctx.body = {
      code:1,
      msg:'修改失败',
      data: column
    }
  }
}

/**
 * 获取专栏详情
 */
exports.getColumnDetails = async(ctx,next) => {
  let params = ctx.params
  console.log(params)
  let column = await Column.findOne({
    _id:params.id
  })
  ctx.body = {
      code:0,
      msg:'查找成功',
      data: await this.formatColumn(column._id)
  }
}

/**
 * 获取所有专栏信息
 */

exports.getAllColumns = async(ctx,next) => {
  let params = ctx.query
  console.log(params)
  let res = await ColumnHelper.findColumnsByPage(params.currentPage-1,params.pageSize)
  let data = []
  for(let i = 0;i<res.length;i++) {
    data.push(await this.formatColumn(res[i]._id))
  }
  ctx.body = {
    code:0,
    msg:'获取成功',
    data:{
      count:await ColumnHelper.getCount(),
      pageSize:params.pageSize,
      currentPage:params.currentPage,
      list:data
    }
  }
}

/**
 * 获取属于专栏的文章列表
 */

exports.getCloumnPosts = async(ctx,next) => {
  let params = ctx.query
  let id = ctx.params.id
  let res = await ColumnHelper.getCloumnPosts(id,params.currentPage - 1,params.pageSize)
  let data = []
  for(let i = 0;i<res.length;i++) {
    let post = await PostCon.formatPost(res[i]._id)
    data.push(post)
  }
  // console.log('data',data)
  ctx.body = {
    code:0,
    msg:'获取成功',
    data:{
      count: await ColumnHelper.getColumnPostCount(id),
      pageSize:params.pageSize,
      currentPage:params.currentPage,
      list:data
    }
  }
}


/**
 * 格式化专栏信息
 */
exports.formatColumn = async(id) => {
  let column = await Column.findOne({
    _id:id
  })
  return {
    _id:column._id,
    title:column.title,
    description:column.description,
    avatar:{
      url:column.avatar?column.avatar:""
    },
    author:column.userId,
    createdAt:column.meta.createAt
  }
}

exports.getAllPost = async(ctx,next) => {
  let params = ctx.query
  let res = await ColumnHelper.getAllPosts(params.currentPage - 1,params.pageSize)
  console.log('res',res)
  let data = []
  for(let i = 0;i<res.length;i++) {
    let post = await PostCon.formatPost(res[i]._id)
    data.push(post)
  }
  ctx.body = {
    code:0,
    msg:'获取成功',
    data:{
      count: await ColumnHelper.getAllPostCount(),
      pageSize:params.pageSize,
      currentPage:params.currentPage,
      list:data
    }
  }
}