const router = require("express").Router();
const jwt = require("jsonwebtoken")

router.post("/" , async(req,res)=>{
 const token = req.body.token;
 try{
   let data = await jwt.verify(token , "SECRET" , {algorithm : 'HS256'});
   res.json({valid : true , message:"Okay"});
 }
 catch(e){
   res.json({valid : false , message : "Not Valid Signature"})
 }
})


module.exports = router;
