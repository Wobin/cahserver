module.exports = function (app) {
    return {
        '/Cards':           { 'get':'Card.index'},
        '/Cards/:Id':        { 'get':'Card.getSingleCard'},
        '/Cards/Add/:Line/:Colour':{'get':'Card.create'},
        '/Cards/Add':         { 'post':'Card.create'},
        '/Cards/Delete/:Id':  { 'get':'Card.delete'},
        '/Cards/AddCondition':    { 'post':'Card.addCondition'},
        '/Users':           { 'get': 'User.index'},
        '/Users/Add/:Name/:Email':{ 'get':'User.create'}

    }
}
