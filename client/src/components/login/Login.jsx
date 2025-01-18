import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setMessage('Please enter both username and password');
      return;
    }

    try {
      console.log("sending")
      setMessage('Validating...');
      const response = await axios.post('http://192.168.1.23:3000/login', {
        username,
        password,
      });
      console.log('password send')

      if (response.data.success) {
        sessionStorage.setItem('isLoggedin', 'true');
        sessionStorage.setItem('role',response.data.role);
        sessionStorage.setItem('Name',response.data.name);
        sessionStorage.setItem('token',response.data.token);
        console.log(sessionStorage.getItem("token"));
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
      setMessage('Uable to connect with Backend');
    }
  };

  const handleSignupRedirect = () => {
    Navigate('/signupone');
   
  };


  return (
    <div className="container">
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
                setMessage(''); // Clear message on input change
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
                setMessage(''); // Clear message on input change
              }}
            />
          </div>

          <div className="btn">
            <button type="submit">Login</button>
          </div>
          
          <div className="signuplink">
          <button onClick={handleSignupRedirect}>Don't have an Password, Create One!</button>
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