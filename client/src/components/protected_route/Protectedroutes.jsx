import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protectedroutes({ children }) {
  const navigate = useNavigate();
  const isLoggedin = sessionStorage.getItem('isLoggedin');
  const userRole=sessionStorage.getItem('role')
  

  useEffect(() => {
    if (!isLoggedin) {
      console.log("Not logged in");
      navigate('/'); // Redirect to the login page
    }
  }, [isLoggedin, navigate]); // Dependencies ensure the effect runs if these values change

  console.log("The role is:",userRole)
  const allowedRoles = ['admin', 'student', 'staff', 'parents','superstaff']; // Allowed roles
  if (!allowedRoles.includes(userRole)) {
    console.log("Unauthorized roles");
    navigate('/'); // Redirect unauthorized roles to login
    return null;
  }
  // Render children only if the user is logged in
  return isLoggedin ? children : null;
}

export default Protectedroutes;