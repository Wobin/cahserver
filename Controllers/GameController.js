var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function ReImportCards() {
        CardController.removeAllCards();
        _.each(BaseCards.WhiteCards, function (card) {
            CardController.addCard(card, "White");
            console.log("Adding White Card: " + card);
        });
        _.each(BaseCards.BlackCards, function (card) {
            CardController.addCard(card, "Black");
            console.log("Adding Black Card: " + card);
        });
        _.each(BaseCards.MultiBlackCards, function (card) {
            var newCard = CardController.addCard(card.Line, "Black");
            console.log("Adding MultiCard: " + card.Line);
            _.each(card.Conditions, function (condition) {
                CardController.addCondition(newCard, condition.Condition, condition.Value);
            });
        });
    }
    GameController.ReImportCards = ReImportCards;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
