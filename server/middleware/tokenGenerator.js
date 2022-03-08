const jwt = require('jsonwebtoken');



async function generateAccessToken(req,res){

  try{
    const refToken = req.cookies.token;

    if(!refToken){
      return "";
    }

    let payload = await jwt.verify(refToken , "mysecretKEY")
    delete payload.exp;
    delete payload.iat;
    let token = await  jwt.sign(payload, "SECRET" , {algorithm : 'HS256' , expiresIn : "10m"});
    return token;
  }
  catch(err){
    console.log(err.message);
    return "";
  }
}

async function checkToken (req,res,next){
  let jwtToken ='';

  try{

    jwtToken = req.header("auth").split(" ")[1];

    if(!jwtToken){
      jwtToken = await generateAccessToken(req,res);
    }

    const payload =  jwt.verify(jwtToken , "SECRET");

    res.locals.jwt = jwtToken;
    next();
  }
  catch(err){

    jwtToken = await generateAccessToken(req,res);
    res.locals.jwt = jwtToken;
    next();
  }
}



module.exports = checkToken;
