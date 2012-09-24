/**
 * Created with JetBrains WebStorm.
 * User: Ben
 * Date: 24/09/12
 * Time: 9:28 PM
 * To change this template use File | Settings | File Templates.
 */


var app = require('matador').createApp(__dirname + '/../'), assert = require('chai').assert
//process.env.MONGOLAB_URI = "mongodb://heroku_app7787842:dgcl65gqmfadi1u895ofvtolie@ds037907-a.mongolab.com:37907/heroku_app7787842"
var Card = app.getModel('Card', false)
var newCard = Card;

describe('Card Tests:', function(){
    describe('Add Card:', function(){
        it('should create a new card', function(){
            Card.create("Test Mocha Card", "White", function(err, retcard) {
                if(err) {
                    assert.fail(retcard, newcard, "Error saving " + err )
                }
                newCard = retcard
                assert.isNotNull(retcard, "Card has been saved")
            })
        })
        })
    describe('Read Card:', function(){
        it('should check the new card exists', function(){
            Card.DBModel.findById(newCard.id, function(err, retcard) {
                if(err){
                    assert.fail(retcard, newCard, "Error retrieving card " + err)
                }
                assert.equal(retcard.id, newCard.id, "Card Matches")
            })
        })
    describe('Remove Card:', function(){
        it('should remove the card', function(){
            Card.delete(newCard.id, function(err, retcard){
                if(err){
                    assert.fail(retcard, newCard, "Error deleting card " + err)
                }
                assert.equal(retcard.id, newCard.id, "Card deleted")
            })
        })
    })
    })
})