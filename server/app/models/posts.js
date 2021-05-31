const mongoose = require('mongoose')
var Schema = mongoose.Schema
var PostsSchema = new Schema({
  title:String,
  column:String,
  author:String,
  content:String,
  image:String,
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

PostsSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.set('useCreateIndex', true);
var t_posts = mongoose.model('t_posts', PostsSchema)

module.exports = t_posts