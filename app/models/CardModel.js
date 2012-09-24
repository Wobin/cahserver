module.exports = function (app, config) {
    return app.getModel("Application", true).extend(function () {
        this.DBModel = this.mongoose.model('Card', new this.Schema({
            colour:String,
            line:{type:String, required:true, trim:true},
            hasCondition:{type:Boolean, default:false},
            conditions:{type:[{ condition:String, num:String}], required:false}
        }))
    })
        .methods({
            create:function (line, colour, callback) {
                var card = new this.DBModel({colour:colour, line:line})
                card.save(callback)
            },
            delete:function (id, callback) {
                this.DBModel.findByIdAndRemove(id, callback)
            },
            addCondition:function (id, condition, num, callback) {
                //var newCondition = new this.Condition()
                this.DBModel.findById(id, function (err, card) {
                    card.conditions.push({ condition:condition, num:num});
                    card.hasCondition = true;
                    card.colour = "Black";
                    card.save(callback)
                })
            }
        })
}