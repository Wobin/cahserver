var TestSuite;
(function (TestSuite) {
    function RunTests() {
        console.log("Commencing tests.... :");
        CardTests();
        PlayerTests();
    }
    TestSuite.RunTests = RunTests;
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
    function assert(outcome, description) {
        console.log("Test: " + (outcome ? "pass " : "fail ") + "- " + description);
    }
})(TestSuite || (TestSuite = {}));

//@ sourceMappingURL=TestSuite.js.map
