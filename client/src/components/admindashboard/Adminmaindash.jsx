import React,{useState,lazy, useEffect} from "react";
import Profile from "./Profile";
import Managestaffs from "./Managestaffs" ;
import Managestudents from "./Managestudents" ;
import Attendance from "./Attendence" ;
import Accounts from "./Accounts" ;
import Progress from "./progress" ;
import Maintainclasses from "./Maintainclasses"; 
import Logout from "../logout/Logout";
import Admindashboard from "./Admindashboard" ;

import "./css/adminmain.css"
import axios from 'axios';

const backendurl='http://192.168.1.23:3000/';


function Adminmaindash() {
    const Name=sessionStorage.getItem('Name');
    const [userdata,setuserdata]=useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const[name,setName]=useState(Name);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [profilevis,setprofilevis]=useState(false)

    const probilevisibility =()=>{
      setprofilevis(!profilevis)

    };

    useEffect(()=>{
      const fetchDatas=async()=>{
         const usernamedata=sessionStorage.getItem('username');
         const token=sessionStorage.getItem('token');
         if (profilevis){
          try{
            
         const response= await axios.post(
          `${backendurl}admin/getstaffprofile`,
          { iddata:{staffid: usernamedata },},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
         )

         if (response.data.success){
           setuserdata(response.data.staffDetails);
           sessionStorage.setItem('token',response.data.token)
         }

         if (response.data.loginstatus==='false'){
          alert("Ivalid Token Loging Out....")
          sessionStorage.removeItem('isLoggedin');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("Name")
          navigate('/');
        }
      }catch(error){
        console.log(error)
      }  
          
          }
    }
    fetchDatas()
    },[profilevis])
    
   
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
          
             <div className="topoption" onClick={probilevisibility}>
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

        {profilevis&&(
          <div className="profileconmain">
            <div className="profileconsub">
             <div className="profileclosebtn">
              <button
              onClick={
                probilevisibility
              }
              >X</button>
             </div>
             <div className="profilecon">
              <h1>Profile</h1>
              
              <div className="profile">
                {userdata.length>0 ?(
                  <div className="profildata">
                    <div className="profiledata1">
                    <div className="pd1">
                      <h3>Name:</h3><h4>{userdata[0].courtesy_title} . {userdata[0].staffname}</h4>
                    </div>

                    <div className="pd1">
                    <h3>Staff ID:</h3><h4>{userdata[0].staffid}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Gender:</h3><h4>{userdata[0].gender}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Date Of Birth:</h3><h4>{userdata[0].dob}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Department:</h3><h4>{userdata[0].department}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Designation:</h3><h4>{userdata[0].designation}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Contact Number:</h3><h4>{userdata[0].contact_no}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Email:</h3><h4>{userdata[0].email}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Place:</h3><h4>{userdata[0].place}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Address:</h3><h4>{userdata[0].address}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Special Designation:</h3><h4>{userdata[0].special_designation}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Joined Date:</h3><h4>{userdata[0].joined_date}</h4>
                    </div>

                    <div className="pd1">
                      <h3>Access Role:</h3><h4>{userdata[0].role}</h4>
                    </div>

                  </div>
                  </div>
                  
                ):(
                  <>
                  <p>No User data</p>
                  </>
                )}
                
              </div>
             </div>
             </div>
          </div>
        )}
        
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
