module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      this.DBModel = this.mongoose.model('Entry', new this.Schema({
          User:   {type : Schema.Types.ObjectId, ref: 'User'},
          Cards: [{type : Schema.Types.ObjectId, ref:'Card'}]
      }))
  })

}