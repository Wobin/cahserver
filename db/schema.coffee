define 'User', ->
    property 'email', String, index: true
    property 'password', String
    property 'activated', Boolean, default: false

Card = describe 'Card', () ->
    property 'Line', String
    property 'Colour', String
    property 'Conditions', [ property 'Condition', String
      property 'Num', Number ]
