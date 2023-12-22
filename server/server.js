const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const cors = require('cors');
const socket = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socket(server);



app.use(cookie());
app.use(cors({
  credentials : true,
  origin : ['http://localhost:3000' , 'http://localhost:3001']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://test:test@cluster0.aupz9.mongodb.net/livecoding?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true})

app.use("/register" , require("./routes/register"));
app.use("/login" , require("./routes/login"));
app.use("/loggedin" , require("./routes/checkLogged"));
app.use("/getName" , require("./routes/getName"));
app.use("/class" , require("./routes/createClass"));
app.use("/submitCode" , require("./routes/submitCode"));



app.get("/",(req,res)=>{
  res.send("hello")
})


app.get("/logout" , (req,res)=>{

  res.clearCookie("token", { httpOnly: true  , secure : true , sameSite : 'none'});
  res.json({ message: "LoggedOut" });
})


let rooms =[];
let socketssCon = {}

io.on('connection' , (socket)=>{

  socket.on('connection' , (data)=>{
      let roomId = data.clsid + '.' + data.userId;
      socketssCon[socket.id] = [roomId , data.userId];
      socket.join(roomId);
      io.in(roomId).emit('room_connection' , 'test');
  })

  socket.on('updateCode' , (data)=>{
    let roomId = data.clsid + '.' + data.userId;
    socket.to(roomId).emit('updateCode' , data.code);
  })

  socket.on('updateOutput' , (data)=>{
    let roomId = data.clsid + '.' + data.userId;
    socket.to(roomId).emit('updateOutput' , data.output);
  })

  socket.on('test' ,()=>{
    console.log('updateCode');
  })

  socket.on('disconnect',()=>{

  })
})


server.listen(5000,()=>{
  console.log("Server up");
})
