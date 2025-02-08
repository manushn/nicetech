const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel=require("../schemas/loginuserschema");

dotenv.config({ path: './.env' });
// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, role, name } = req.body;

  // Validate input
  if (!username || !password || !role || !name) {
    return res.status(201).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(201).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role,
      name,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    // Respond with error
    res.status(500).json({ error: error.message });
  }
 
});


// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    // Validate input
    if (!username || !password) {
      return res.status(201).json({ message: "Username and password are required", success: false });
    } else {
      try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(201).json({ message: "User does not exist", success: false });
        }
  
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(201).json({ message: "Invalid credentials", success: false });
        }
          
        const jwttoken=jwt.sign(
                  {name:user.name,role:user.role},
                  process.env.JWT_SECRET_KEY,
                  { expiresIn: process.env.TOKEN_EXPAIRATION }
                );
  
        // Respond with success and the user's role
        res.status(200).json({ message: "Login Successful", success: true, role: user.role, name: user.name ,username:user.username,token:jwttoken});
      } catch (error) {
        res.status(500).json({ error: error.message, success: false });
      }
    }
  });
  

module.exports = router;
