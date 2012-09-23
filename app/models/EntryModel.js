module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      this.DBModel = this.mongoose.model('Entry', new this.Schema({
          User:   User,
          Cards: [Card]
      }))
  })

}