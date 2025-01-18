import React,{useState} from "react";
import Profile from "./Profile";
import Managestaffs from "./Managestaffs";
import Managestudents from "./Managestudents";
import Attendance from "./Attendence";
import Accounts from "./Accounts";
import Progress from "./progress";
import Maintainclasses from "./Maintainclasses"

import "./css/adminmain.css"
import Logout from "../logout/Logout";
import Admindashboard from "./Admindashboard";
function Adminmaindash() {
    const Name=sessionStorage.getItem('Name');
    const [activeTab, setActiveTab] = useState('dashboard');
    const[name,setName]=useState(Name);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    
   
    const rendercon=()=>{
        switch (activeTab) {
            case 'dashboard':
              return <Admindashboard/>;
            case 'managestaffs':
              return <Managestaffs />;
            case 'managestudents':
              return <Managestudents />;
            case 'accounts':
              return <Accounts />;
            case 'attendence':
              return <Attendance />;
            case 'progress':
              return <Progress />;
            case 'maintainclasses':
              return <Maintainclasses />;
            default:
              return <Profile/>;
          }
    }
  
    return (
    <>
    <div className="containers">

    <div className="top">
   
        <div className="logo">
            <img src="nologoshort.png"/>
        </div>
   
        <div className="topmenu">
          
             <div className="topoption">
                 <div className="userprofile">
                     <img src="profile.png"/>
                     <p>{name}</p>
                 </div>
  
                 <div className="logout">
                     <Logout className="logoutadmin"/>
                  </div>
              </div>
        </div>
    </div>

    <div className="down">
        <div className="sidebar">
            
            <div className="slider">
          
                 <ul>
                    <div className="menumobile"><li onClick={()=>setSidebarCollapsed(false)} ><img src="menu.png"/></li></div>
                    <li onClick={() => { setActiveTab('dashboard'); setSidebarCollapsed(true); }}><img src="adminimg/home.png"/><span>Dashboard</span></li>
                    <li onClick={()=>{setActiveTab('managestaffs'); setSidebarCollapsed(true);}}><img src="adminimg/teamwork.png"/><span>Managestaffs</span></li>
                    <li onClick={()=>{setActiveTab('managestudents'); setSidebarCollapsed(true);}}><img src="adminimg/people.png"/><span>Managestudents</span></li>
                    <li onClick={()=>{setActiveTab('accounts'); setSidebarCollapsed(true);}}><img src="adminimg/accounting.png"/><span>Accounts</span></li>
                    <li onClick={()=>{setActiveTab('attendence'); setSidebarCollapsed(true);}}><img src="adminimg/attendance.png"/><span>Attendance</span></li>
                    <li onClick={()=>{setActiveTab('progress'); setSidebarCollapsed(true);}}><img src="adminimg/rising.png"/><span>progress</span></li>
                    <li onClick={()=>{setActiveTab('maintainclasses'); setSidebarCollapsed(true);}}><img src="adminimg/calendar.png"/><span>Maintain Classes</span></li>
                 </ul>
             </div>

             {sidebarCollapsed ? (
             <div className="slidermobile">
          
          <ul>
                    <div className="menumobile"><li onClick={()=>setSidebarCollapsed(false)} ><img src="menu.png"/></li></div>
                    
                 </ul>
             </div>):(
              <div className="slidermobilefull">
          
          <ul>
                    <div className="menumobilefull"><li onClick={()=>setSidebarCollapsed(true)} ><img src="menu.png"/></li></div>
                    <li onClick={() => { setActiveTab('dashboard'); setSidebarCollapsed(true); }}><img src="adminimg/home.png"/><span>Dashboard</span></li>
                    <li onClick={()=>{setActiveTab('managestaffs'); setSidebarCollapsed(true);}}><img src="adminimg/teamwork.png"/><span>Managestaffs</span></li>
                    <li onClick={()=>{setActiveTab('managestudents'); setSidebarCollapsed(true);}}><img src="adminimg/people.png"/><span>Managestudents</span></li>
                    <li onClick={()=>{setActiveTab('accounts'); setSidebarCollapsed(true);}}><img src="adminimg/accounting.png"/><span>Accounts</span></li>
                    <li onClick={()=>{setActiveTab('attendence'); setSidebarCollapsed(true);}}><img src="adminimg/attendance.png"/><span>Attendance</span></li>
                    <li onClick={()=>{setActiveTab('progress'); setSidebarCollapsed(true);}}><img src="adminimg/rising.png"/><span>progress</span></li>
                    <li onClick={()=>{setActiveTab('maintainclasses'); setSidebarCollapsed(true);}}><img src="adminimg/calendar.png"/><span>Maintain Classes</span></li>
                 </ul>
          </div>
             )}
         </div>

       <div className="contentss">{rendercon()}</div>

    </div>
   
    </div>
    </>
      
    
  )
}

export default Adminmaindash
