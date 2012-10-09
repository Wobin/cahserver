var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function getGame(game) {
        return DB.findOne(game);
    }
    GameController.getGame = getGame;
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
    function newCardPool(gameId) {
        var game = DB.findOne(gameId);
        game.WhiteCardPool = _.shuffle(CardController.getAllWhiteCards());
        game.BlackCardPool = _.shuffle(CardController.getAllBlackCards());
    }
    GameController.newCardPool = newCardPool;
    function retrieveWhiteHand(gameId) {
        var game = DB.findOne(gameId);
        return game.WhiteCardPool.splice(0, 10);
    }
    GameController.retrieveWhiteHand = retrieveWhiteHand;
    function retrieveBlackCard(gameId) {
        var game = DB.findOne(gameId);
        return game.BlackCardPool.pop();
    }
    GameController.retrieveBlackCard = retrieveBlackCard;
    function discardWhiteCard(gameId, card) {
        var game = DB.findOne(gameId);
        game.WhiteDisCards.push(card);
        return game.WhiteCardPool.pop();
    }
    GameController.discardWhiteCard = discardWhiteCard;
    function addPlayer(gameId, player) {
        var game = DB.findOne(gameId);
        if(_.contains(_.pluck(game.Scoreboard, "Player"), player)) {
            return false;
        }
        game.Scoreboard.push({
            Player: player,
            Score: 0,
            Points: 0
        });
        return true;
    }
    GameController.addPlayer = addPlayer;
    function removePlayer(gameId, player) {
        var game = DB.findOne(gameId);
        game.Scoreboard = _.reject(game.Scoreboard, function (score) {
            return score.Player == player;
        });
    }
    GameController.removePlayer = removePlayer;
    function currentGames(player) {
        return DB.find({
            "Scoreboard.Player": player
        }, {
            fields: {
                _id: 1
            }
        }).fetch();
    }
    GameController.currentGames = currentGames;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
