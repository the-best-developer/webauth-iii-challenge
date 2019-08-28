const secrets = require('./secrets.js');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
      subject: user.id, // sub in payload is what the token is about
      username: user.username,
      department: user.department
    };
  
    const options = {
      expiresIn: '1d', // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

const tokenCheck = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(500).json({message: "token missing"})
    }
    
    jwt.verify(token, secrets.jwtSecret, (error, newToken) => {
        if (err) {
          res.status(401).json({message: 'error verifying token', error: err.message});
        } else { 
          // decodedToken! next()!
          //
          // we add decodedToken to the req object just so that 
          // future middleware methods can have access to it...
          // in our example here, no middleware methods are accessing
          // it, but it makes sense to store it... our app may grow!
          //
          req.token = token;
          next();
        }
      });
}

module.exports = {
    generateToken,
    tokenCheck
}