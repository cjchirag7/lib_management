var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
          required: true,      
      },
    lastname: {
        type: String,
         required: true,     
      },
      email:{
          type: String,
          required: true,
          unique: true
      },
      roll:{
        type: String,
        required: true,
        unique: true
      },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);