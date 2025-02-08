import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Superstaffcontent from "../components/superstaff/Superstaffmain.jsx"

function Parentscontent() {
  const navigate = useNavigate();
  const roles=sessionStorage.getItem('role');
  console.log(roles)
  useEffect(() => {
    if (roles !== 'superstaff') {
      // Redirect users based on their roles
      switch (roles) {
        case 'staff':
          navigate('/Staffcontent');
          break;
        case 'student':
          navigate('/Studentcontent');
          break;
        case 'admin':
          navigate("/Admincontent");
          break;
        case 'parent':
            navigate("/Parentscontent")
        default:
          console.log('Unauthorized role');
          navigate('/');
          sessionStorage.removeItem('isLoggedin');
          sessionStorage.removeItem('role');
      }
    }
  }, [roles, navigate]);

  // Only render content if the role is admin
  if (roles !== 'superstaff') {
    return null; // Prevent rendering before redirection
  }
  return (
    <div>
      <Superstaffcontent/>
      
    </div>
  )
}

export default Parentscontent