
const mongoose = require('mongoose')
const Column = mongoose.model('t_columns')
const Post = mongoose.model('t_posts')
exports.findColumnsByPage = async(page,size) => {
  const query =  Column.find({})
  let res = await query.exec()
  return res.slice(page * size,page * size + Number(size))
} 

exports.getCount = async() => {
  const query = Column.find({})
  let res = await query.exec()
  return res.length
}

exports.getCloumnPosts = async(columnId,page,size) => {
  let res = await Post.find({
    column:columnId
  }).exec()
  return  res.slice(page * size,page * size + Number(size))
}
exports.getAllPosts = async(page,size) => {
  let res = await Post.find({
  }).exec()
  // console.log('res1',res,page,size)
  return  res.slice(page * size,page * size + Number(size))
}
exports.getAllPostCount = async () => {
  let user = await Column.findOne({
  })
  let res = await Post.find({author:user.userId}).exec()
  return  res.length
}



exports.getColumnPostCount = async (columnId) => {
  let user = await Column.findOne({
    _id:columnId
  })
  let res = await Post.find({author:user.userId}).exec()
  return  res.length
}