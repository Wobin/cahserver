var require = ___meteor_bootstrap__.require;
var _ = require("underscore");
var BaseCards = BaseCards;
var CardController = CardController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function ReImportCards() {
        _.each(BaseCards.WhiteCards, function (card) {
            CardController.addCard(card.Line, "White");
        });
    }
    GameController.ReImportCards = ReImportCards;
})(exports.GameController || (exports.GameController = {}));


//@ sourceMappingURL=GameController.js.map
