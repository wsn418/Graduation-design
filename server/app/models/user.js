var mongoose = require('mongoose')
var Schema = mongoose.Schema

var t_userSchema = new Schema({
  email:{
    unique:true,
    type: String
  },
  nickName:{
    unique:true,
    type:String
  },
  password:{
    unique:true,
    type:String
  },
  avatar:String,
  description:String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

// Defines a pre hook for the document.
t_userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})


/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
mongoose.set('useCreateIndex', true);
var t_user = mongoose.model('t_users', t_userSchema)

module.exports = t_user
