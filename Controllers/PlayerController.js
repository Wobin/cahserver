(function (PlayerController) {
    var DB = new Meteor.Collection("Players");
    function getPlayer(id) {
        return DB.findOne({
            _id: id
        }).fetch();
    }
    PlayerController.getPlayer = getPlayer;
    function addPlayer(userName) {
        var newPlayer = {
            userName: userName
        };
        var id = DB.insert(newPlayer);
        return getPlayer(id);
    }
    PlayerController.addPlayer = addPlayer;
    function getAll() {
        var allPlayers = DB.find({
        });
        if(allPlayers.count() > 0) {
            return allPlayers.fetch();
        }
    }
    PlayerController.getAll = getAll;
})(exports.PlayerController || (exports.PlayerController = {}));


//@ sourceMappingURL=PlayerController.js.map
