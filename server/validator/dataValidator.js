const Users = require("../models/Users.js")


const validateData = async (data)=>{
  let payload ={
    valid : false,
    message : ""
  }


  if(data.name.length == 0){
    payload.message = "Enter A Name"
    return payload
  }

  if(data.username.length ==0){
    payload.message = "Enter A Username"
    return payload
  }

  try{
    const user = await Users.findOne({username : data.username});
    if(user){
      payload.message = "User Already Exists"
      return payload
    }
  }
  catch(e){
    console.log(e.message);
    payload.message = "Internal Server Error"
    return payload;
  }


  if(data.password.length == 0){
    payload.message = "Enter A Password"
    return payload;
  }

  if(data.cpass.length == 0){
    payload.message = "Enter The Confirm Password"
    return payload;
  }

  if(data.password != data.cpass){
    payload.message = "Password And Confirm Password Do not Match";
    return payload;
  }

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!(data.email.match(mailformat))){
    payload.message = "Enter a Valid Email"
    return payload;
  }


  payload.valid = true;
  return payload
}


module.exports = validateData
