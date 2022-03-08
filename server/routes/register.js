const router = require('express').Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs")
const {v4 : uuidv4} = require('uuid')

const validateData = require("../validator/dataValidator")

router.post("/" , async (req,res)=>{
  const data = req.body;
  let validity = await validateData(data);
  if(!validity.valid){

    res.json(validity);
    return;
  }
  try{
  const userId = await uuidv4();
  let password = data.password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password , salt);

  const user = new Users({
    type : data.type,
    username : data.username,
    password : password,
    id : userId
  })


    await user.save();
    console.log("User Saved");
    res.json({valid : true , message : "User Registered"})
  }
  catch(e){
    console.log(e.message);
    res.json({valid : false , message : "Internal Server Error"})
  }
})

router.get("/" , (req,res)=>{
  res.json({message : "Register Route"})
})

module.exports = router;
