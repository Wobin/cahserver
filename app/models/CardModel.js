module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      var schema = new this.Schema(
         { line : {type : String, required : true, trim: true}}
        ,{ conditions : {type :[condition], required: false}}
      )
      this.DBModel = this.mongoose.model('Card', schema )
  })
      .methods({
          create: function(line, callback){
              var card = new this.DBModel({
                  line : line
              })
              card.save(callback)
          },
          addNumericCondition: function(id, condition, num, callback) {
              var condition = new Condition({ condition: condition, num : num})
              var card = this.DBModel.findById(id, callback).conditions.push(condition)
              card.save(callback)
          }
      })

}