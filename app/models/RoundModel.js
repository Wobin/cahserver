module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function (){
      this.DBModel = this.mongoose.model('Round', new this.Schema({
          Czar:   User
          ,RoundNumber: Number
          ,BlackCard: Card
          ,Entries: [Entry]
          ,Winner : Entry
      }))
  })

}