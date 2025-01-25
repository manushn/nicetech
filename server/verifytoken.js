const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const Verifytoken = (req, res, next) => {
  // Extract token from headers, body, or query parameters
  const token =
    req.headers.authorization?.split(" ")[1] || // Note: Corrected casing of 'authorization'
    req.body.token ||                           // Use `token` instead of `tokens` for consistency
    req.query.token;

  

  // Check if the token exists
  if (!token) {
    return res.status(203).json({ message:"No Token Provided",loginstatus:'false'});
  }

  // Verify the provided token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      
      return res.status(202).json({ error: "Invalid or expired token" ,loginstatus:'false'});
    }

    // Add user data to the request object
    req.userdata = decoded;

    // Generate a new token with a refreshed expiration
    const newToken = jwt.sign(
      { name: decoded.name, role: decoded.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION || "15m" } // Use environment variable or fallback
    );

    

    // Attach the new token to the request object
    req.newToken = newToken;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = { Verifytoken };