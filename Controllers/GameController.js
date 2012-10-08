var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function ReImportCards() {
        CardController.removeAllCards();
        _.each(BaseCards.WhiteCards, function (card) {
            CardController.addCard(card, "White");
            console.log("Adding Card: " + card);
        });
    }
    GameController.ReImportCards = ReImportCards;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
