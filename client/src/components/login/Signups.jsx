import React, { useState, useEffect } from 'react';
import Tops from '../top/Tops';
import "./signups.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signups() {
  const navigate = useNavigate();

  const [regUsername, setRegUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [repassMessage, setRepassMessage] = useState('');
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendOtpDisabled, setResendOtpDisabled] = useState(true);
  const [Message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [createbtn,setcreatebtn]=useState(false);

  const handleSignup = async (e) => {
    console.log("create button pressed")

    if (password === confirmPassword) {
      const minLength = 6;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length > minLength;

      if (hasUpperCase && hasNumber && hasSymbol && isValidLength) {
        console.log("Created password verified")
        setcreatebtn(true);
        try {
          console.log("in try")
          const response = await axios.post('http://192.168.1.23:3000/signups', {
            username:regUsername,
            password
          }); 

          if (response.data.message){
            setMailMessage(response.data.message)
          }
          if (response.data.nouser) {
            
            setMailMessage("User Not found");
          }

          if (response.data.erroruser) {
            
            setMailMessage("ERROR IN FINDING USER");
          }

          if (response.data.remessage) {
            
            setMessage('');
            setIsOtp(true);
          }

          if (response.data.noOtp) {
            setMessage("Error in sending OTP");
          }
          console.log("Try finished")
        } catch (error) {
          console.error("Error during signup:", error);
        }
      } else {
        setPassMessage(
          "Password must be longer than 6 characters, and include at least one uppercase letter, one number, and one symbol."
        );
      }
    } else {
      setRepassMessage("Passwords do not match!");
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendOtpDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      await axios.post('http://192.168.1.23:3000/signup', {
        username:regUsername,
        password
      });
      setTimer(90);
      setResendOtpDisabled(true);
    } catch (error) {
      console.error("Error in resending OTP:", error);
    }
  };

  const submitOtp = async () => {
    try {
      const response = await axios.put('http://192.168.1.23:3000/verifyotp', {
        username: regUsername,
        otps:otp,
        password,
      });
      if (response.data.success) {
        alert("Password updated successfully!");
        navigate('/');
      }
      if(response.data.message){
        setMessage(response.data.message)
      }
    } catch (error) {
      console.error("Error in confirming OTP:", error);
    }
  };

  return (
    <>
      <Tops />
      {isOtp ? (
        <div className="signupotp">
          <div className="signupotp-container">
            <h1>Verification</h1>
            <label>Enter OTP sent to your registered email ID</label>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="resendotp">
              <button onClick={handleResendOtp} disabled={resendOtpDisabled}>
                Resend OTP
              </button>
              {resendOtpDisabled && (
                <p>Resend button will be enabled in {timer} seconds</p>
              )}
            </div>
            <div className="otpsubmit">
              <button onClick={submitOtp}>Confirm OTP</button>
            </div>
            <div className="messagep">
            <p>{Message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="signupcon">
          <div className="signupmain">
            <label>Enter Username</label>
            <input
              placeholder="example@gmail.com"
              value={regUsername}
              onChange={(e) => {setRegUsername(e.target.value);
                setPassMessage('');
                setcreatebtn(false);
                setMailMessage('');
                setConfirmPassword('');
                setRepassMessage('');
              }}
            />
            <p>{mailMessage}</p>

            <label>Create a password</label>
            <input
              placeholder="Password must be at least 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPassMessage('');
                setcreatebtn(false);
                setMailMessage('');
                setConfirmPassword('');
                setRepassMessage('');
              }}
            />
            <p>{passMessage}</p>

            <label>Re-enter Password</label>
            <input
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPassMessage('');
                setcreatebtn(false);
                setMailMessage('');
                setRepassMessage('');
              }}
            />
            <p>{repassMessage}</p>

            <button onClick={handleSignup} disabled={createbtn}>Create</button>

            <div className="loginredirect">
              <button onClick={() => navigate('/login')}>Back to Login</button>
            </div>
            <div className="messagep">
            <p>{Message}</p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

export default Signups;