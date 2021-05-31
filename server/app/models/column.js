var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ColumnSchema = new Schema({
  userId:{
    unique: true,
    type:String
  },
  avatar:String,
  description:String,
  title:String,
  column: String,
  createdAt: String,
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
ColumnSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.set('useCreateIndex', true);
var t_user = mongoose.model('t_columns', ColumnSchema)

module.exports = t_user