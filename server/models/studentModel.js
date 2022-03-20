const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name : String,
  id : String,
  email : String,
  username : String,
  classRoom : Array
})

module.exports = mongoose.model('studDetails', StudentSchema)
