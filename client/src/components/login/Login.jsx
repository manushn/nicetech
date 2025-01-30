import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchatrue, setcaptchatrue] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    if (!captchaValue) return; // Prevent unnecessary API calls

    const verifycaptcha = async () => {
      try {
        const response = await axios.post('http://192.168.1.23:3000/verifycaptcha', {
          captchaValue,
        });

        if (response.data.success) {
          setcaptchatrue(false);
        } else {
          setcaptchatrue(true);
        }
      } catch (error) {
        console.error("Error in verifying captcha", error);
        setcaptchatrue(true);
      }
    };

    verifycaptcha();
  }, [captchaValue]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please enter both username and password');
      return;
    }

    try {
      setMessage('Validating...');
      const response = await axios.post('http://192.168.1.23:3000/login', {
        username,
        password,
      });

      if (response.data.success) {
        sessionStorage.setItem('isLoggedin', 'true');
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('Name', response.data.name);
        sessionStorage.setItem('token', response.data.token);

        setMessage('Login Successful');

        switch (response.data.role) {
          case 'admin':
            Navigate('/Admincontent');
            break;
          case 'student':
            Navigate('/Studentcontent');
            break;
          case 'staff':
            Navigate('/Staffcontent');
            break;
          case 'parents':
            Navigate('/Parentscontent');
            break;
          default:
            setMessage('Role not defined');
        }
      } else {
        setMessage('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Unable to connect with Backend');
    }
  };

  const handleSignupRedirect = () => {
    Navigate('/signupone');
  };

  return (
    <div className="containerss">
      <form onSubmit={handleLogin}>
        <div className="hed">
          <h2>LOGIN</h2>
        </div>
        <div className="detail">
          <div className="username">
            <label>Username</label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMessage('');
              }}
            />
          </div>

          <div className="password">
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage('');
              }}
            />
          </div>
          
          <div className="recapchas">
          <div className="recapchabtn">
            <ReCAPTCHA
              sitekey="6Lcv0MYqAAAAAAuNn4nWlwuEXJgnw5rY64Uqw01x" // Replace with your actual site key
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>  
          </div>

          <div className="btn">
            <button type="submit" disabled={!captchaValue || captchatrue}>Login</button>
          </div>

          <div className="signuplink">
            <button type="button" onClick={handleSignupRedirect}>Don't have a password? Create one!</button>
          </div>

          <div className="message">
            <p>{message}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;