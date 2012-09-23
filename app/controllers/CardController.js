module.exports = function (app, config) {

  return app.getController("Application", true).extend()
  .methods({
    index: function (req, res) {
    var data = { title: "Card Management"}
    var Card = app.getModel('Card');
    var Controller = this;
    var q = v.queue( function() {
        Card.DBModel.find({ colour : /Black/i}, function(err, cards) { data.BlackCards = cards; q.next(); })
    }, function() {
        Card.DBModel.find({ colour : /White/i}, function(err, cards) { data.WhiteCards = cards; q.next(); })
    }, function() {
        Controller.render(res, 'CardManager', data)
    });
        q.next();
    },
    create: function(req, res){
        var Controller = this
        app.getModel('Card').create(req.params.Line, req.params.Colour, function(err, card) { Controller.index(req, res)})
  },
     delete : function(req, res) {
         var Controller = this
         app.getModel('Card').delete(req.params.Line, function(err, card) { Controller.index(req, res) })
     }
      })
}