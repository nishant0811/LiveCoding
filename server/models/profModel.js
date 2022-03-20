const mongoose = require("mongoose");

const ProfSchema = mongoose.Schema({
  name : String,
  id : String,
  email : String,
  username : String,
  classRoom : Array
})

module.exports = mongoose.model('profDetails', ProfSchema)
