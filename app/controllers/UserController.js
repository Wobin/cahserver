module.exports = function (app, config) {

  return app.getController("Application", true).extend()
  .methods({
    index: function (req, res) {

    },
    create:function (req, res) {
              var Controller = this
              app.getModel('User').create(req.params.Name, req.params.Email, function (err, card) {
                      Controller.index(req, res)
                  })
              }
  })

}