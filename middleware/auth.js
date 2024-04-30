const jwt = require('jsonwebtoken');

module.exports = {
    ensureAuth: function (req, res, next) {
      passport.authenticate('jwt', { session: false })
      const token = req.headers.authorization;

      // Check if the token is present
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
    
      try {
        // Verify the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    
        // Attach the decoded token payload to the request object for future use
        req.user = decoded;
        next(); // Proceed to the next middleware
      } catch (err) {
        // If token verification fails, return an error response
        return res.status(403).json({ message: 'Invalid token' });
      }
    },
  }


  