import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css'

function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedin') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedin');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the login page or any other route
  };

  return (
    <div className='logoutbtn'>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => navigate('/')}>Login</button> // Redirect to login page
      )}
    </div>
  );
}

export default Logout;