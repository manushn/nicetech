import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protectedroutes({ children }) {
  const navigate = useNavigate();
  const isLoggedin = sessionStorage.getItem('isLoggedin');
  const userRole=sessionStorage.getItem('role')
  console.log(isLoggedin);

  useEffect(() => {
    if (!isLoggedin) {
      console.log("Not logged in");
      navigate('/'); // Redirect to the login page
    }
  }, [isLoggedin, navigate]); // Dependencies ensure the effect runs if these values change

  const allowedRoles = ['admin', 'student', 'staff', 'parents']; // Allowed roles
  if (!allowedRoles.includes(userRole)) {
    console.log("Unauthorized role");
    navigate('/'); // Redirect unauthorized roles to login
    return null;
  }
  // Render children only if the user is logged in
  return isLoggedin ? children : null;
}

export default Protectedroutes;