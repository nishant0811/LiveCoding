const router = require('express').Router();
const Users = require("../models/Users");
const Prof = require("../models/profModel.js")
const Student = require("../models/studentModel.js")
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
    id : userId,
    name : data.name
  })


    await user.save();

    if(data.type == p){
      let profDet = new Prof({
        name : data.name,
        id : userid,
        email : data.email,
        username : data.username,
        classRoom : []
      })

      await profDet.save();
    }

    else {
      let studDet = new Student({
        name : data.name,
        id : userid,
        email : data.email,
        username : data.username,
        classRoom : []
      })


      await studDet.save();
    }

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
