var mongoose =  require('mongoose')
const { count } = require('mongoose/lib/model')
var User = mongoose.model('t_users')

exports.findByid = async ({phoneNumber}) => {
  let query = User.find({phoneNumber})
  let res = null
  await query.exec(function(err,user){
    if(err) {
      res = {}
    }else{
      res = user
    }
  })
  return user
}

exports.getUserList = async(page,size) => {
  let res = await User.find({
  }).exec()
  // console.log(res,'res')
  return {
    count:res.length,
    res:res.slice(page * size,page * size + Number(size))
  }  
}

exports.addUser = async(user) => {
  user = await user.save()
  return user
}