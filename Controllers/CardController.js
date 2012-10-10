var CardController;
(function (CardController) {
    var DB = new Meteor.Collection("Cards");
    function addCondition(CardId, Condition, Value) {
        DB.update(CardId, {
            $addToSet: {
                Conditions: {
                    Condition: Condition,
                    Value: Value
                }
            }
        });
    }
    CardController.addCondition = addCondition;
    function removeCondition(CardId, Condition) {
        DB.update(CardId, {
            $pull: {
                Conditions: {
                    Condition: Condition
                }
            }
        });
    }
    CardController.removeCondition = removeCondition;
    function getAll() {
        var allCards = DB.find({
        });
        if(allCards.count() > 0) {
            return allCards.fetch();
        }
    }
    CardController.getAll = getAll;
    function getCard(id) {
        return DB.findOne({
            _id: id
        });
    }
    CardController.getCard = getCard;
    function getAllBlackCards() {
        return DB.find({
            Colour: "Black"
        }, {
            fields: {
                _id: 1
            }
        }).fetch();
    }
    CardController.getAllBlackCards = getAllBlackCards;
    function getAllWhiteCards() {
        return DB.find({
            Colour: "White"
        }, {
            fields: {
                _id: 1
            }
        }).fetch();
    }
    CardController.getAllWhiteCards = getAllWhiteCards;
    function addCard(Line, Colour) {
        var newCard = {
            Line: Line,
            Colour: Colour
        };
        var id = DB.insert(newCard);
        return getCard(id);
    }
    CardController.addCard = addCard;
    function removeCard(cardId) {
        DB.remove(cardId);
    }
    CardController.removeCard = removeCard;
    function removeAllCards() {
        DB.remove({
        });
    }
    CardController.removeAllCards = removeAllCards;
})(CardController || (CardController = {}));

//@ sourceMappingURL=CardController.js.map
