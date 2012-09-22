module.exports = function (app, config) {
  return app.getModel('Base', true).extend(function() {
    this.DBModel = this.mongoose.model('Game',new this.Schema({

    }))
   })
}