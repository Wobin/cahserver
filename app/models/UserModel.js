module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
      this.DBModel = this.mongoose.model('User', new this.Schema({
          login: {type : String, required : true, trim:true}
          ,twitter: {type : String, required : false}
          ,facebook: {type :String, required : false}
      }))
  })
              .methods({
                create: function (name, email, callback) {
                    var user = new this.DBModel({
                        name: name
                        , email: email
                    })
                    user.save(callback)
                }
                , find: function (id, callback) {
                    this.DBModel.findById(id, callback)
                }
            })
 }