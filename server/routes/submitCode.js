const express = require('express');
const router = express.Router();

const tokenGenerator = require("../middleware/tokenGenerator");
const userAuth = require("../middleware/userAuth");

const axios = require('axios');
const request = require('request');

router.get("/" , (req,res)=>{
  res.send('Hitting Get route of Submit Code');
})


router.post("/" ,tokenGenerator , userAuth,  async(req,res)=>{
  let data = req.body;

  try{
    const payload = {
      script : data.code,
      language : "java",
      version : "3",
      clientId : "96a9db960bc50ba6e2ae103cee0fd3d",
      clientSecret : "c07be2bd88ff045cf5b5d4e3e186ea38d0ae21bf68404e9ef972dc6442157fb7"
    }

    let output;
    let respo
   await request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: payload
  },(error , response , body)=>{
    output = body
    respo = response
    res.json({message : respo , token : req.jwtToken , output : output});
  });


  }
  catch(e){
    console.log(e.message);
    res.json({message : 'failed' , token : req.jwtToken});
  }

})


module.exports = router
