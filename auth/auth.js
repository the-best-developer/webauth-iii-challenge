const secrets = require('./secrets.js');
const jwt = require('jsonwebtoken');

function generateToken (user) {
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

function tokenCheck (req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(500).json({message: "token missing"})
    }
    
    jwt.verify(token, secrets.jwtSecret, (error, newToken) => {
        if (error) {
          res.status(401).json({message: 'error verifying token', error: error.message});
        } else {

          req.token = newToken;
          console.log(newToken)
          next();
        }
    });
}

module.exports = {
    generateToken,
    tokenCheck
}