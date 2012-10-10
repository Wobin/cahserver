var TestSuite;
(function (TestSuite) {
    function RunTests() {
        console.log("Commencing tests.... :");
        CardTests();
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
    function assert(outcome, description) {
        console.log("Test: " + (outcome ? "pass " : "fail ") + "- " + description);
    }
})(TestSuite || (TestSuite = {}));

//@ sourceMappingURL=TestSuite.js.map
