var TestSuite;
(function (TestSuite) {
    var Tests = new Meteor.Collection("Tests");
    function RunTests() {
        console.log("Commencing tests.... :");
        if(Tests.find({
            failed: {
                $gt: new Date().getTime() - 5000
            }
        }).count() > 0) {
            return;
        }
        CardTests();
        PlayerTests();
        GameTests();
    }
    TestSuite.RunTests = RunTests;
    function assert(outcome, description) {
        console.log("Test: " + (outcome ? "pass " : "fail ") + "- " + description);
        if(!outcome) {
            Tests.insert({
                failed: new Date().getTime()
            });
        }
    }
    function CardTests() {
        console.log("Card Tests");
        var card = CardController.addCard("Test Card", "Black");
        var id = card._id;
        assert(card != null, "Create Card");
        CardController.addCondition(id, "Test Condition", 3);
        card = CardController.getCard(id);
        assert(card.Conditions[0].Condition == "Test Condition", "Add Condition");
        CardController.removeCard(id);
        assert(CardController.getCard(id) == null, "Remove Card");
    }
    function PlayerTests() {
        console.log("Player Tests");
        var player = PlayerController.addPlayer("TestPlayer933", "test");
        var getFromDB = PlayerController.getPlayer(player._id);
        assert(getFromDB.Username == "TestPlayer933", "Create Player");
        var login = PlayerController.addPlayer("TestPlayer933", "test");
        assert(login.Username == "TestPlayer933", "Login Player");
        var loginfail = PlayerController.addPlayer("TestPlayer933", "fail");
        assert(loginfail == null, "Invalid Login");
        PlayerController.deletePlayer(player.Username, player.Password);
        var retrievePlayer = PlayerController.getPlayer(player._id);
        assert(retrievePlayer == null, "Delete Player");
    }
    function GameTests() {
        console.log("Game Tests");
        var player1 = PlayerController.addPlayer("TestPlayer1", "test");
        var player2 = PlayerController.addPlayer("TestPlayer2", "test");
        var player3 = PlayerController.addPlayer("TestPlayer3", "test");
        var player4 = PlayerController.addPlayer("TestPlayer4", "test");
        var player5 = PlayerController.addPlayer("TestPlayer5", "test");
        var newGame = GameController.createGame();
        assert(newGame != null, "Game created");
        console.log("New Game created: " + newGame.GameName);
        GameController.addPlayer(newGame._id, player1._id);
        assert(newGame.Scoreboard != undefined, "Player added to game");
        GameController.addPlayer(newGame._id, player2._id);
        assert(newGame.Scoreboard.length == 2, "Two players added");
        GameController.addPlayer(newGame._id, player3._id);
        GameController.addPlayer(newGame._id, player4._id);
        GameController.addPlayer(newGame._id, player5._id);
        assert(newGame.Scoreboard.length == 5, "We have 5 players: " + _.reduce(_.pluck(newGame.Scoreboard, "Username"), function (memo, name) {
            return memo + " " + name;
        }, ""));
        PlayerController.deletePlayer("TestPlayer1", "test");
        PlayerController.deletePlayer("TestPlayer2", "test");
        PlayerController.deletePlayer("TestPlayer3", "test");
        PlayerController.deletePlayer("TestPlayer4", "test");
        PlayerController.deletePlayer("TestPlayer5", "test");
        GameController.deleteGame(newGame._id);
        assert(GameController.getGame(newGame._id) == null, "Game deleted");
    }
})(TestSuite || (TestSuite = {}));

//@ sourceMappingURL=TestSuite.js.map
