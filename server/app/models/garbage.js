var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GarbageSchema = new Schema({
  name:String,
  category:String,
})
// Defines a pre hook for the document.
GarbageSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.set('useCreateIndex', true);
var t_garbage = mongoose.model('t_garbage', GarbageSchema)

module.exports = t_garbage