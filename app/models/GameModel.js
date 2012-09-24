module.exports = function (app, config) {
  return app.getModel("Application", true).extend(function() {
      this.DBModel = this.mongoose.model('Game', new this.Schema({
          Users:  [{type : Schema.Types.ObjectId, ref: 'User', required : true}],
          Rounds: [{type : Schema.Types.ObjectId, ref: 'Round', required : false}],
          CurrentRound: Number
      }))
  })

}