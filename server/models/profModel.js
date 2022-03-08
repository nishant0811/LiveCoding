const mongoose = require("mongoose");

const ProfSchema = mongoose.Schema({
  name : String,
  id : String,
  email : String,
  username : String,
  password : String
})

module.exports = mongoose.model('profDetails' ,)
