module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      var schema = new this.Schema(
          {condition: {type : String, required : true, trim:true}}
          ,{num: {type : Number, required : false}}
      )
      this.DBModel = this.mongoose.model('Condition', schema )
  })

}