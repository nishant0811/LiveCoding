const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = res.locals.jwt;
    
    if (!jwtToken) {
      req.jwtToken = ''
      return res.json({valid : false , message : "No Token Found"})
    }

    const payload = jwt.verify(jwtToken, "SECRET");

    req.data = payload;
    req.jwtToken = jwtToken


    next();
  } catch (error) {

    return res.json({valid : false , message : "Invalid Token"})
  }
};
