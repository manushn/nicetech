import React, { useEffect } from 'react';
import Logout from '../components/logout/Logout'
import { useNavigate } from 'react-router-dom';
import Adminmaindash from '../components/admindashboard/Adminmaindash';
import "./css/admincon.css"
import DisableBackButton from '../components/disable_back_button/DisableBackButton';

function Admincontent() {
  const navigate = useNavigate();
  const roles=sessionStorage.getItem('role');
  console.log(roles)
  useEffect(() => {
    if (roles !== 'admin') {
      // Redirect users based on their roles
      switch (roles) {
        case 'staff':
          navigate('/Staffcontent');
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
  if (roles !== 'admin') {
    return null; // Prevent rendering before redirection
  }
  return (
    <div>
      <DisableBackButton/>
      <div className="bottom">
      <Adminmaindash/>
      </div>
    </div>
  )
}

export default Admincontent
