import React, { useEffect } from 'react';
import Logout from '../components/logout/Logout'
import { useNavigate } from 'react-router-dom';

function Staffcontent() {
  const navigate = useNavigate();
  const roles=sessionStorage.getItem('role');
  console.log(roles)
  useEffect(() => {
    if (roles !== 'staff') {
      // Redirect users based on their roles
      switch (roles) {
        case 'admin':
          navigate("/Admincontent");
          break;
        case 'student':
          navigate('/Studentcontent');
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
  if (roles !== 'staff') {
    return null; // Prevent rendering before redirection
  }
  return (

    <div>
      <h1>Welcome staff</h1>
      <Logout/>
    </div>
  )
}

export default Staffcontent
