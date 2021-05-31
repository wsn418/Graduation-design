const mongoose = require('mongoose')
var Garbage = mongoose.model('t_garbage')
const Crypto = require('crypto')
const { post } = require('superagent')
const { toJSON } = require('../../app')
var parse_id = require('parse-cn-idcard')
var User = mongoose.model('t_users')
var Column = mongoose.model('t_columns')
var Post = mongoose.model('t_posts')
const request = require('superagent');
var eventproxy = require('eventproxy')
const { EPERM } = require('constants')
var ep = new eventproxy()
exports.getGarbageClass = async(ctx,next) => {
  const name = ctx.request.query.name
  console.log(name)
  const res = await Garbage.find({name:{$regex:name,$options:'$i'}}).sort({category:1})
  ctx.body = {
    code:0,
    data:res
  }
}
exports.parseId = async(ctx,next) => {
    const id = ctx.request.query.id
    const res = parse_id(id)
    console.log('res', res)
    if(res) {
      ctx.body = {
        code:0,
        data:res
      }
    }else{
      ctx.body = {
        code:1,
        data:'身份证号有误'
      }
    }
}
exports.getIpinfoFrom = async(ip)=> {
    let res = []
    request
    .get(`https://api.ip138.com/ip/?ip=${ip}&datatype=jsonp&token=10c2511c58ee80a0f71027521c352491`)
    .then((err,res) => {
      res = err.body.data
      ep.emit('data',res)
    })
    ep.all('data',res=>{
      console.log('datas')
    })
}

exports.getIpinfo = async(ctx,next) =>{
  const ip = ctx.request.query.ip
  let data = []
  await request
    .get(`https://api.ip138.com/ip/?ip=${ip}&datatype=jsonp&token=10c2511c58ee80a0f71027521c352491`)
    .then((err,res) => {
      res = err.body.data
      data = res
    })
    ctx.body = {
      code:0,
      data:data
    }
}