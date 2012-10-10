var PlayerController;
(function (PlayerController) {
    var DB = new Meteor.Collection("Players");
    function getPlayer(id) {
        return DB.findOne({
            _id: id
        });
    }
    PlayerController.getPlayer = getPlayer;
    function addPlayer(userName, password) {
        var player = DB.findOne({
            Username: userName
        });
        console.log(player);
        if(player != null) {
            if(player.Password == password) {
                return player;
            } else {
                return null;
            }
        }
        var newPlayer = {
            Username: userName,
            Password: password
        };
        var id = DB.insert(newPlayer);
        return getPlayer(id);
    }
    PlayerController.addPlayer = addPlayer;
    function deletePlayer(userName, password) {
        DB.remove({
            Username: userName,
            Password: password
        });
    }
    PlayerController.deletePlayer = deletePlayer;
    function getAll() {
        var allPlayers = DB.find({
        });
        if(allPlayers.count() > 0) {
            return allPlayers.fetch();
        }
        return null;
    }
    PlayerController.getAll = getAll;
})(PlayerController || (PlayerController = {}));

//@ sourceMappingURL=PlayerController.js.map
