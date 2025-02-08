import React ,{useEffect,useState}from 'react';
import Ssdashboard from "./Sstaffdashboard";
import Ssschedule from "./Sstaffschedule";
import Ssclasses from "./Sstaffclass";
import Ssassignments from "./Sstaffassignments";
import Ssexams from "./Sstaffexams";
import Sspayments from "./Sstaffpayments";
import SSmanagestu from "./Sstaffmanagestu";

import "./css/Ssmain.css"
import axios from 'axios';
import Logout from "../logout/Logout";

const backendurl='http://192.168.1.23:3000/';

function Superstaffmain() {
 
     const Name=sessionStorage.getItem('Name');
     const [userdata,setuserdata]=useState([]);
     const [activeTab, setActiveTab] = useState('ssdashboard');
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
            console.log("Staffid:",usernamedata)
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
      }catch(error){
        console.log(error)
      }  
          
          }
    }
    fetchDatas()
    },[profilevis])

    const rendercon=()=>{
      switch (activeTab) {
          case 'ssschedules':
            return <Ssschedule />;
          case 'ssclasses':
            return <Ssclasses />;
          case 'ssasignments':
            return <Ssassignments />;
          case 'ssexams':
            return <Ssexams />;
          case 'sspayments':
            return <Sspayments />;
          case 'ssmanagestu':
            return <SSmanagestu />;
          default:
            return <Ssdashboard/>;
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
         <div className="profileclosebtn">
          <button
          onClick={
            probilevisibility
          }
          >X</button>
         </div>
         <div className="profilecon">
          <h1>Profile</h1>
          <h3>Hello {name} 😊</h3>
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
    )}
    
    <div className="sidebar">
        
        <div className="slider">
      
             <ul>
                <div className="menumobile"><li onClick={()=>setSidebarCollapsed(false)} ><img src="menu.png"/></li></div>
                <li onClick={() => { setActiveTab('dashboard'); setSidebarCollapsed(true); }}><img src="adminimg/home.png"/><span>Dashboard</span></li>
                <li onClick={()=>{setActiveTab('ssschedules'); setSidebarCollapsed(true);}}><img src="staffimg/project.png"/><span>Schedules</span></li>
                <li onClick={()=>{setActiveTab('ssclasses'); setSidebarCollapsed(true);}}><img src="staffimg/classes.png"/><span>Classes</span></li>
                <li onClick={()=>{setActiveTab('ssasignments'); setSidebarCollapsed(true);}}><img src="staffimg/assignment.png"/><span>Assignment</span></li>
                <li onClick={()=>{setActiveTab('ssexams'); setSidebarCollapsed(true);}}><img src="staffimg/exam.png"/><span>Exam</span></li>
                <li onClick={()=>{setActiveTab('sspayments'); setSidebarCollapsed(true);}}><img src="staffimg/wallet.png"/><span>Payments</span></li>
                <li onClick={()=>{setActiveTab('ssmanagestu'); setSidebarCollapsed(true);}}><img src="staffimg/students.png"/><span>Manage Students</span></li>
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
                <li onClick={()=>{setActiveTab('ssschedules'); setSidebarCollapsed(true);}}><img src="staffimg/project.png"/><span>Schedules</span></li>
                <li onClick={()=>{setActiveTab('ssclasses'); setSidebarCollapsed(true);}}><img src="staffimg/classes.png"/><span>Classes</span></li>
                <li onClick={()=>{setActiveTab('ssasignments'); setSidebarCollapsed(true);}}><img src="staffimg/assignment.png"/><span>Assignment</span></li>
                <li onClick={()=>{setActiveTab('ssexams'); setSidebarCollapsed(true);}}><img src="staffimg/exam.png"/><span>Exam</span></li>
                <li onClick={()=>{setActiveTab('sspayments'); setSidebarCollapsed(true);}}><img src="staffimg/wallet.png"/><span>Payments</span></li>
                <li onClick={()=>{setActiveTab('ssmanagestu'); setSidebarCollapsed(true);}}><img src="staffimg/students.png"/><span>Manage Students</span></li>
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

export default Superstaffmain
