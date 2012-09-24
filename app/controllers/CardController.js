module.exports = function (app, config) {
    var step = require('step'), formidable = require('formidable')//, v = require('valentine')

    return app.getController("Application", true).extend()
        .methods({
            index:function (req, res) {
                var row = 1;
                var divisor = 1;
                var data = { title:"Card Management",
                    'rowcount': function() { return Math.ceil(row++/divisor);},
                    'colcount' : function() {return Math.ceil(row%divisor) + 1;}}
                var Card = app.getModel('Card');
                var Controller = this;
                step(
                    function getCards() {
                        Card.DBModel.find({ colour:/Black/i}, this.parallel())
                        Card.DBModel.find({ colour:/White/i}, this.parallel())
                    },
                    function renderPage(err, blackCards, whiteCards) {
                        v(blackCards).map(function(card) { card.admin = true;})
                        v(whiteCards).map(function(card) { card.admin = true;})
                        data.BlackCards = blackCards
                        data.WhiteCards = whiteCards
                        divisor = Math.ceil(Math.sqrt(blackCards.length + whiteCards.length))
                        Controller.render(res, 'CardManager', data);
                    })



            },
            retrieveCards:function (data) {

            },
            create:function (req, res) {
                var Controller = this
                if (req.method == "GET") {
                    app.getModel('Card').create(req.params.Line, req.params.Colour, function (err, card) {
                        Controller.index(req, res)
                    })
                }
                else {
                    var form = new formidable.IncomingForm()
                    form.parse(req, function (err, fields, files) {
                        app.getModel('Card').create(fields.Line, fields.Colour, function (err, card) {
                            Controller.index(req, res)
                        })
                    })
                }

            },
            addCondition:function (req, res) {
                var Controller = this;
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    app.getModel('Card').addCondition(fields.CardId, fields.Condition, fields.Num, function (err, card) {
                        Controller.index(req, res)
                    })
                })

            },
            delete:function (req, res) {
                var Controller = this
                app.getModel('Card').delete(req.params.Id, function (err, card) {
                    Controller.index(req, res)
                })
            },

            getSingleCard:function (req, res) {
                var Controller = this
                var data = { title:"Card Management"}
                app.getModel('Card').DBModel.findById(req.params.Id, function (err, card) {
                    if(card.colour == "Black"){
                        data.BlackCards = [card]
                    }
                    else{
                        data.WhiteCards = [card]
                    }
                    Controller.render(res, 'CardManager', data);
                })
            }
        })
}