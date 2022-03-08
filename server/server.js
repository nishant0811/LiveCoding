const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookie());
app.use(cors({
  credentials : true,
  origin : ['http://localhost:3000' , 'http://localhost:3001']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.aupz9.mongodb.net/LiveCoding?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true} )



app.use("/register" , require("./routes/register"));
app.use("/login" , require("./routes/login"));
app.use("/loggedin" , require("./routes/checkLogged"))


app.get("/",(req,res)=>{
  res.send("hello")
})


app.listen(5000,()=>{
  console.log("Server up");
})
