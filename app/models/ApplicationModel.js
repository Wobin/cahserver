module.exports = function (app, config) {
  return app.getModel('Base', true).extend(function() {
      this.mongo = require('mongodb')
      this.mongoose = require('mongoose')
      this.Schema = this.mongoose.Schema
      this.mongoose.connect(process.env.MONGOLAB_URI)
   })
}