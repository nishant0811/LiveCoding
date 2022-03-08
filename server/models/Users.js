const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id : String,
  username : String,
  password : String,
  type : String,
})


module.exports = mongoose.model('Users' , UserSchema);
