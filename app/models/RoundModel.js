module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function (){
      this.DBModel = this.mongoose.model('Round', new this.Schema({
          Czar:   {type : Schema.Types.ObjectId, ref: 'User'},
          RoundNumber: Number,
          BlackCard: {type : Schema.Types.ObjectId, ref: 'Card'},
          Entries: [{type: Schema.Types.ObjectId, ref: 'Entry'}],
          Winner : {type: Schema.Types.ObjectId, ref: 'Entry'}
      }))
  })

}