module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      this.DBModel = this.mongoose.model('Card', new this.Schema(
          { colour : String
          , line : {type : String, required : true, trim: true}
          , hasCondition : {type : Boolean, default : false}
          , conditions : {type :[{condition: String, num : Number}], required: false}
        }))
    })
        .methods({
          create: function(line, colour, callback){
              var card = new this.DBModel({
                  colour : colour,
                  line : line
              })
              card.save(callback)
          },
          delete: function(line, callback) {
              this.DBModel.findOneAndRemove({line : line }, callback)
          },
          addCondition: function(id, condition, num, callback) {
              var condition = new Condition({ condition: condition, num : num})
              var card = this.DBModel.findById(id, callback);
              card.conditions.push(condition);
              card.hasCondition = true;
              card.colour = "Black";
              card.save(callback)
          }

  })
}