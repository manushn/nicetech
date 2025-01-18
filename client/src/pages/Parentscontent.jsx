import React, { useEffect } from 'react';
import Logout from '../components/logout/Logout'
import { useNavigate } from 'react-router-dom';

function Parentscontent() {
  const navigate = useNavigate();
  const roles=sessionStorage.getItem('role');
  console.log(roles)
  useEffect(() => {
    if (roles !== 'parents') {
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
        default:
          console.log('Unauthorized role');
          navigate('/');
          sessionStorage.removeItem('isLoggedin');
          sessionStorage.removeItem('role');
      }
    }
  }, [roles, navigate]);

  // Only render content if the role is admin
  if (roles !== 'parents') {
    return null; // Prevent rendering before redirection
  }
  return (
    <div>
      <h1>Welcome parent</h1>
      <Logout/>
    </div>
  )
}

export default Parentscontent
