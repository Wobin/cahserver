module.exports = function (app) {
  return {
    '/': {'get': 'Card.index'},
    '/AddCard/:Line/:Colour': {'get': 'Card.create'},
    '/RemoveCard/:Line' : {'get': 'Card.delete'}
  }
}
