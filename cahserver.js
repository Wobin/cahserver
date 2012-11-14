if(Meteor.is_client) {
    Template.hello.greeting = function () {
        return "Welcome to cahserver.";
    };
    Template.hello.events = {
        'click input': function () {
            if(typeof console !== 'undefined') {
                console.log("You pressed the button");
            }
        }
    };
}
if(Meteor.is_server) {
    Meteor.startup(function () {
        Meteor.publish("all-games", function () {
            return GameController.getGames();
        });
        TestSuite.RunTests();
    });
}
//@ sourceMappingURL=cahserver.js.map
