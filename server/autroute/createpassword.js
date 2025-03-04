const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const UserModel=require("../schemas/loginuserschema");
const bcrypt = require("bcryptjs");


let otp;
const otpStore = {};
let staffDetails;

// Function to generate OTP
function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

// Function to send OTP via email
async function sendOtp(email, name,username) {
    otp = generateOtp();
    console.log("Email:",email,"Name:",name,"username:",username)
    otpStore[username] = otp;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nicetonline@gmail.com',
            pass: 'ghtc wkmn bubx eoyu', // Use environment variables for security
        },
    });

    let mailOptions = {
        from: 'nicetonline@gmail.com',
        to: email,
        subject: `Hi ${name}, Verification OTP Fom NICETECH`,
        text: `Your OTP code is ${otp} to create your password. Don't Share your OTP and PASSWORDS with anyone.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
}

// Route to handle user signup
router.post('/signups', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(203).json({ message: "All fields are required" });
    }
    
    try {
        staffDetails = await UserModel.findOne({ username });
        console.log(staffDetails)
        if (staffDetails) {
            console.log(staffDetails.email, staffDetails.name,staffDetails.username,"beforeCheck")
            
                console.log(staffDetails.email, staffDetails.name,staffDetails.username,"Check")
                const otpSent = await sendOtp(staffDetails.email, staffDetails.name,staffDetails.username);
                
                if (otpSent) {
                     return res.status(200).json({ remessage: true });
                } else {
                     return res.status(500).json({ nootp: true });
                }
              

            
        } else {
            return res.status(203).json({ nouser: "Staff details not found" });
        }
    } catch (error) {
        console.error('Error in finding staff:', error);
        console.log(error);
        return res.status(203).json({ erroruser: "Error in finding staff", error });
    }
});

// Route to verify OTP and update password
router.put('/verifyotp', async (req, res) => {
    const { username, otps, password } = req.body;

    if (!username || !otps || !password) {
        return res.status(203).json({ message: "All fields are required" });
    }
   const storedotps= otpStore[username];

    if (otps == storedotps) {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const updatedUser = await UserModel.updateOne(
                { username },
                { $set: { password:hashedPassword } }
            );

            if (updatedUser.modifiedCount > 0) {
                delete otpStore[username];
                return res.status(200).json({ success: true });
            } else {
                return res.status(203).json({ message: "Staff not found or no changes detected" });
            }
            
        } catch (error) {
            console.error('Error updating staff details:', error);
            return res.status(203).json({ message: "Unable to update staff details" });
        }
    } else {
        return res.status(203).json({ message:"Invalid OTP" });
    }
});

module.exports = router;