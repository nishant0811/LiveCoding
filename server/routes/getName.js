const router = require("express").Router();
const Users = require("../models/Users")
const tokenGenerator = require("../middleware/tokenGenerator");
const userAuth = require("../middleware/userAuth");

router.get("/", tokenGenerator , userAuth , async (req,res)=>{
    const data = req.data;
    try{
      const user = await Users.findOne({id : data.id});
      let uname = ""
      if(user.name)
      uname = user.name;

      res.json({valid : true , message : "Okay" , token : req.jwtToken , name : uname , type : user.type})

    }
    catch(e){
      console.log(e.message);

    }


    return;
})


module.exports = router;
