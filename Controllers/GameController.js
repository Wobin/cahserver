var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function ReImportCards() {
        CardController.removeAllCards();
        _.each(BaseCards.WhiteCards, function (card) {
            CardController.addCard(card.Line, "White");
            console.log("Adding Card: " + card.Line);
        });
    }
    GameController.ReImportCards = ReImportCards;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
