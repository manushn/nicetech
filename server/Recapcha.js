const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.post("/verifycaptcha", async (req, res) => {
  const { captchaValue } = req.body;
 

  if (!captchaValue) {
    return res.status(203).json({ success: false, message: "Captcha is required" });
  }

  const secretKey = process.env.RECAPCHA_SECRETKEY; 
  
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`);

    if (response.data.success) {
      return res.status(200).json({ success: true, message: "Captcha verified" });
    } else {
      return res.status(203).json({ success: false, message: "Captcha verification failed" });
    }
  } catch (error) {
    console.error("Error verifying captcha:", error.message);
    return res.status(203).json({ success: false, message: "Server error" });
  }
});

module.exports = router;