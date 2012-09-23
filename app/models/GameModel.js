module.exports = function (app, config) {
  return app.getModel("Application", true).extend(function() {
      this.DBModel = this.mongoose.model('Game', new this.Schema({
          Users:  {type : [User], required : true }
          ,Rounds: {type : [Round], required : false}
          ,Scores: {type : [Score], required : false}
          ,CurrentRound: Number
      }))
  })

}