const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
  res.send("Login Route");
})

router.post("/" , async(req,res)=>{
  const data = req.body;
  let payload ={
    valid : false,
    message :""
  }



  if(data.username.length == 0){
    payload.message = "Enter A Username";
    res.json(payload);
    return;
  }

  try{
    const user = await Users.findOne({username : data.username})
    if(!user){
      payload.message = "Invalid Credentials"
      res.json(payload);
      return;
    }
    const compared = await bcrypt.compare(data.password, user.password);
    if(!compared){
      payload.message = "Invalid Credentials"
      res.json(payload);
      return;
    }
    payload = {
      type : user.type,
      id : user.id,
      username : user.username
    }
    const reftoken = await jwt.sign(payload, "mysecretKEY", {algorithm : 'HS256' , expiresIn : "7d"});
    const accessToken = await jwt.sign(payload, "SECRET" , {algorithm : 'HS256' , expiresIn : "10m"});
    await res.cookie("token",reftoken,{ httpOnly: true  , secure : true , sameSite : 'none' , maxAge : 604800000});
    res.json({valid : true , message : "Okay" , token : accessToken , userid : user.id})

  }

  catch(e){
    console.log(e.message);
    res.json({valid : false , message : "Internal Server Error"})
  }
})


module.exports = router
