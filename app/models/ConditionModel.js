module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      this.DBModel = this.mongoose.model('Condition', new this.Schema({
              condition: {type : String, required : true, trim: true},
              num: {type : Number, required : false}
    }))
  })

}