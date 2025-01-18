import React, { useEffect } from 'react';
import Logout from '../components/logout/Logout'
import { useNavigate } from 'react-router-dom';

function Studentcontent() {
  const navigate = useNavigate();
  const roles=sessionStorage.getItem('role');
  console.log(roles)
  useEffect(() => {
    if (roles !== 'student') {
      // Redirect users based on their roles
      switch (roles) {
        case 'staff':
          navigate('/Staffcontent');
          break;
        case 'admin':
          navigate("/Admincontent");
          break;
        case 'parents':
          navigate('/Parentcontent');
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
  if (roles !== 'student') {
    return null; // Prevent rendering before redirection
  }
  return (
    <div>
      <h1>Welcome student</h1>
      <Logout/>
    </div>
  )
}

export default Studentcontent
