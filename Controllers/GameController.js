var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function ReImportCards() {
        _.each(BaseCards.WhiteCards, function (card) {
            CardController.addCard(card.Line, "White");
        });
    }
    GameController.ReImportCards = ReImportCards;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
