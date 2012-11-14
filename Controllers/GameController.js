var GameController;
(function (GameController) {
    var DB = new Meteor.Collection("Games");
    function getGame(game) {
        return DB.findOne(game);
    }
    GameController.getGame = getGame;
    function getGames() {
        return DB.find();
    }
    GameController.getGames = getGames;
    function createGame(name) {
        if(name == null) {
            name = getRandomName();
        }
        name.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        var newGame = {
            GameName: name
        };
        var id = DB.insert(newGame);
        var newGame = getGame(id);
        this.newCardPool(newGame);
        return newGame;
    }
    GameController.createGame = createGame;
    function deleteGame(gameId) {
        DB.remove(gameId);
    }
    GameController.deleteGame = deleteGame;
    function getRandomName() {
        var GameNames = ([
            "frog", 
            "womble", 
            "cabbage", 
            "bing", 
            "advice", 
            "anger", 
            "answer", 
            "apple", 
            "arithmetic", 
            "badge", 
            "basket", 
            "basketball", 
            "battle", 
            "beast", 
            "beetle", 
            "beggar", 
            "brain", 
            "branch", 
            "bubble", 
            "bucket", 
            "cactus", 
            "cannon", 
            "cattle", 
            "celery", 
            "cellar", 
            "cloth", 
            "coach", 
            "coast", 
            "crate", 
            "cream", 
            "daughter", 
            "donkey", 
            "drug", 
            "earthquake", 
            "feast", 
            "fifth", 
            "finger", 
            "flock", 
            "frame", 
            "furniture", 
            "geese", 
            "ghost", 
            "giraffe", 
            "governor", 
            "honey", 
            "hope", 
            "hydrant", 
            "icicle", 
            "income", 
            "island", 
            "jeans", 
            "judge", 
            "lace", 
            "lamp", 
            "lettuce", 
            "marble", 
            "month", 
            "north", 
            "ocean", 
            "patch", 
            "plane", 
            "playground", 
            "poison", 
            "riddle", 
            "rifle", 
            "scale", 
            "seashore", 
            "sheet", 
            "sidewalk", 
            "skate", 
            "slave", 
            "sleet", 
            "smoke", 
            "stage", 
            "station", 
            "thrill", 
            "throat", 
            "throne", 
            "title", 
            "toothbrush", 
            "turkey", 
            "underwear", 
            "vacation", 
            "vegetable", 
            "visitor", 
            "voyage", 
            "year"
        ]);
        return _.shuffle(GameNames).pop() + _.shuffle(GameNames).pop() + _.shuffle(GameNames).pop();
    }
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
                CardController.addCondition(newCard._id, condition.Condition, condition.Value);
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
    function addPlayer(gameId, playerId) {
        var game = DB.findOne(gameId);
        var player = PlayerController.getPlayer(playerId);
        if(_.contains(_.pluck(game.Scoreboard, "Player"), player)) {
            return false;
        }
        if(game.Scoreboard == undefined) {
            DB.update(gameId, {
                Scoreboard: []
            });
        }
        DB.update(gameId, {
            $addToSet: {
                Scoreboard: {
                    Player: player._id,
                    Score: 0,
                    Points: 0
                }
            }
        });
        return true;
    }
    GameController.addPlayer = addPlayer;
    function removePlayer(gameId, playerId) {
        var game = DB.findOne(gameId);
        game.Scoreboard = _.reject(game.Scoreboard, function (score) {
            return score.Player._id == playerId;
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
    function getPlayers(gameId) {
        return _.map(_.pluck(GameController.getGame(gameId).Scoreboard, "Player"), function (player) {
            return PlayerController.getPlayer(player);
        });
    }
    GameController.getPlayers = getPlayers;
})(GameController || (GameController = {}));

//@ sourceMappingURL=GameController.js.map
