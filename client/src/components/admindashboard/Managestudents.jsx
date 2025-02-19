import React, { useEffect, useState } from 'react'
import "./css/managestudents.css"
import axios from 'axios';



const backendurl='http://192.168.1.23:3000/';


function Managestudents() {

  const [Searchbox,setSearchbox]=useState('');
  const [searchstuname,setsearchstuname]=useState('');
  const [searchstuid,setsearchstuid]=useState('');
  const [searchdistinct,setsearchdistinct]=useState('');
  

  const [currentbatch,setcurrentbatch]=useState('');
  const [currentdepartment,setcurrentdepartment]=useState('');
  const [deleteverifys,setdeleteverifys]=useState('');


  const [Addstudentbtn,setAddstudentbtn]=useState(false);
  const [batchselect,setbatchselect]=useState(true);
  const [Departmentselect,setDepartmentselect]=useState(false);
  const [Studentsselect,setStudentsselect]=useState(false);
  const [studenteditbtn,setstudenteditbtn]=useState(false);

  const [studentsdata,setstudentsdata]=useState([]);
  const [carddata,setcarddata]=useState([]);
  const [sortdatas,setsortdatas]=useState([]);

  const [studentid,setstudentid]=useState('');
  const [courtesyTitle,setcourtesyTitle]=useState('');
  const [studentname,setstudentname]=useState('');
  const [regnumber,setregnumber]=useState('');
  const [gender,setgender]=useState('');
  const [dob,setdob]=useState('');
  const [department,setdepartment]=useState('');
  const [batch,setbatch]=useState('');
  const [contactnumber,setcontactnumber]=useState('');
  const [email,setemail]=useState('');
  const [place,setplace]=useState('');
  const [address,setaddress]=useState('');
  const [parentname,setparentname]=useState('');
  const [pcontactnumber,setpcontactnumber]=useState('');
  const [admissionmode,setadmissionmode]=useState('');
  const [staymode,setstaymode]=useState('');
  const [travelmode,settravelmode]=useState('');
  const [status,setstatus]=useState('');
  const [admiteddate,setadmiteddate]=useState('');
  const [lastedited,setlastedited]=useState('');

  const [batchmessage,setbatchmessage]=useState('');
  const [contactnumessage,setcontactnummessage]=useState('');
  const [pcontactnumessage,setpcontactnummessage]=useState('');
  const [emailmessage,setemailmessage]=useState('');
//.............................................................................
  //Use effect to verify batch 

  useEffect(()=>{
    if(batch.length >4){
      setbatchmessage("The Batch must be in this formate : 2023");
      setbatch('');
      
    }
  },[batch]);
//.............................................................................


 
  // To Validate Phone Number
  useEffect(() => {
    if (contactnumber.length === 0 || contactnumber.length === 10) {
      setcontactnummessage('');
    }
  
    if (contactnumber.length > 10) {
      setcontactnummessage('Number must be 10 digits');
      setcontactnumber('');
    }
  
    if (contactnumber.length < 10 && contactnumber.length > 0) {
      setcontactnummessage('Number must be 10 digits');
    }
    if (pcontactnumber.length === 0 || pcontactnumber.length === 10) {
      setpcontactnummessage('');
    }
  
    if (pcontactnumber.length > 10) {
      setpcontactnummessage('Number must be 10 digits');
      setpcontactnumber('');
    }
  
    if (pcontactnumber.length < 10 && pcontactnumber.length > 0) {
      setpcontactnummessage('Number must be 10 digits');
    }

    if(email.length>0){
      if (!email.includes("@gmail.com")) {
        setemailmessage("Email must be in format");
      }
    }
  }, [contactnumber,pcontactnumber,email]);
//.............................................................................

//UseEffect to Set values 
  useEffect(()=>{
    if(Departmentselect){
      setcarddata([]);
      setsearchdistinct("department");
      setsortdatas('');
      setsearchstuname('');
      setsearchstuid('');
      
    };
    if(batchselect){
      setcarddata([]);
      setsearchdistinct("batch");
      setsortdatas('');
      setsearchstuname('');
      setsearchstuid('');
      
    };
    if(Searchbox.length>0){

      setsearchstuname(Searchbox);
      setsortdatas({studentid:1,courtest_title:1,studentname:1,department:1,batch:1});
    };
    if(Studentsselect){
      setsortdatas({studentid:1,courtest_title:1,studentname:1,department:1,batch:1});
      setsearchdistinct('');
      
      setsearchstuname('');
      setsearchstuid('');
    }
    if(searchstuid.length>0){
      setsortdatas('');
    };
    if(Addstudentbtn){
           setstudentid('');
           setcourtesyTitle('');
           setstudentname('');
           setregnumber('');
           setgender('');
           setdob('');
           setdepartment('');
           setbatch('');
           setcontactnumber('');
           setemail('');
           setplace('');
           setaddress('');
           setparentname('');
           setpcontactnumber('');
           setadmissionmode('');
           setstaymode('');
           settravelmode('');
           setstatus('');
           setadmiteddate('');
           setlastedited('');
    }
    
  },[Departmentselect, batchselect,searchdistinct,Studentsselect])
//.............................................................................

// to fetch student data
  useEffect(() => {

    const fetchdata = async () => {
      setcarddata([]);
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          `${backendurl}admin/getstudent`,
          {studentid:searchstuid,studentname:searchstuname,distinctes:searchdistinct,searchfilter:{batch:currentbatch,department:currentdepartment}},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        sessionStorage.setItem('token', response.data.token);
        
        if(response.data.success){ 
          setcarddata(response.data.studentdata);
          
        };
        
        if(response.data.StudentData){
          setstudentsdata(response.data.StudentData);
        };

        if (response.data.selectstudentdata && response.data.selectstudentdata.length > 0) {
          
          const studentdata = response.data.selectstudentdata[0];
           
          setstudentid(studentdata.studentid || "");
          setcourtesyTitle(studentdata.courtest_title || "");
          setstudentname(studentdata.studentname || "");
          setregnumber(studentdata.regnumber || "");
          setgender(studentdata.gender || "");
          setdob(studentdata.dob || "");
          setdepartment(studentdata.department || "");
          setbatch(studentdata.batch || "");
          setcontactnumber(studentdata.contactnumber || "");
          setemail(studentdata.email || "");
          setplace(studentdata.place || "");
          setaddress(studentdata.address || "");
          setparentname(studentdata.parentname || "");
          setpcontactnumber(studentdata.pcontactnumber || "");
          setadmissionmode(studentdata.admissionmode || "");
          setstaymode(studentdata.staymode || "");
          settravelmode(studentdata.travelmode || "");
          setstatus(studentdata.status || "");
          setadmiteddate(studentdata.admiteddate || "");
          setlastedited(studentdata.lastedited||"");
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

        
      } catch (error) {
        console.log("Unable to fetch student data");
      }
    };
    fetchdata();
    
  }, [searchdistinct,Studentsselect]);

  //.............................................................................

  const updatestudent=async()=>{
    try{
      const token = sessionStorage.getItem('token');
      const lastusername=sessionStorage.getItem('Name');
      const newstudent={
        studentid,
        courtest_title:courtesyTitle,
        studentname,
        regnumber,
        gender,
        dob,
        department,
        batch,
        contactnumber,
        email, 
        place,
        address,
        parentname,
        pcontactnumber,
        admissionmode,
        staymode,
        travelmode,
        status,
        admiteddate,
        lastedited:lastusername
      };

      const response = await axios.put(
        `${backendurl}admin/studentupdate`,
        newstudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      
      sessionStorage.setItem('token', response.data.token);

      if(response.data.message){
        alert(response.data.message)
      }
      if (response.data.success){
        
        setstudenteditbtn(false);
        setDepartmentselect(false);
        setStudentsselect(true);
        setbatchselect(false);
      }
      if(response.data.fullsuccess){
        
        setstudenteditbtn(false);
        setDepartmentselect(false);
        setStudentsselect(false);
        setbatchselect(false);
      }

      if (response.data.message){
        alert(response.data.message)
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
  alert(error)
 } 
  }

 
//.............................................................................
  const handeladdstudent= async()=>{
    
   try{
        const token = sessionStorage.getItem('token');
        const lastusername=sessionStorage.getItem('Name');
        const newstudent={
          courtest_title:courtesyTitle,
          studentname,
          regnumber,
          gender,
          dob,
          department,
          batch,
          contactnumber,
          email, 
          place,
          address,
          parentname,
          pcontactnumber,
          admissionmode,
          staymode,
          travelmode,
          status,
          admiteddate,
          lastedited:lastusername
        };

        const response = await axios.post(
          `${backendurl}admin/addstudent`,
          newstudent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        
  
        if (response.data.message){
          alert(response.data.message)
        }

        if (response.data.success){
           setstudentid('');
           setcourtesyTitle('');
           setstudentname('');
           setregnumber('');
           setgender('');
           setdob('');
           setdepartment('');
           setbatch('');
           setcontactnumber('');
           setemail('');
           setplace('');
           setaddress('');
           setparentname('');
           setpcontactnumber('');
           setadmissionmode('');
           setstaymode('');
           setlastedited('');
           settravelmode('');
           setstatus('');
           setadmiteddate('');
           setstudenteditbtn(false);
           setStudentsselect(false);
           setAddstudentbtn(false);
           setbatchselect(true);
           
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
    alert(error)
   } 
  }
//.............................................................................

//To Delete Student

const deletestudent=async()=>{
  if (deleteverifys === 'DELETE STUDENT') {
    try {

      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`${backendurl}admin/studentdelete`, {
        data: { studentid: studentid },
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setdeleteverifys('');

      if (response.data.loginstatus==='false'){
        alert("Ivalid Token Loging Out....");
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem("token");
        navigate('/');
      }

      sessionStorage.setItem('token', response.data.token);
      if (response.data.success){
        setStudentsselect(false);
        setDepartmentselect(false);
        setbatchselect(false);
        setstudenteditbtn(false);
      };
      alert(response.data.message);

      if (response.data.loginstatus==='false'){
        alert("Ivalid Token Loging Out....")
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("Name")
        navigate('/');
      }
      
    } catch (error) {
      console.error('Error deleting staff:', error.message);
    }
  }else{
    alert("Enter:'DELETE STUDENT' in the box");
    setdeleteverifys('');
  }
}
  const courtesy_titlename=[
    { value: '', label: 'Courtesy_title' },
    { value: 'Mr', label: 'Mr' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Mrs', label: 'Mrs' },
  ] 

  const genderselect=[
    { value: '', label: 'Select Gender' },
    { value: 'MALE', label: 'MALE' },
    { value: 'FEMALE', label: 'FEMALE' },
    { value: 'OTHERS', label: 'OTHERS' },
  ]

  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', label: 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE' },
    { value: 'COMPUTER SCIENCE ENGINEERING', label: 'COMPUTER SCIENCE ENGINEERING' },
    { value: 'ELECTRONICS AND COMMUNICATION ENGINEERING', label: 'ELECTRONICS AND COMMUNICATION ENGINEERING' },
    { value: 'ELECTRICAL AND ELECTRONICS ENGINEERING', label: 'ELECTRICAL AND ELECTRONICS ENGINEERING' },
    { value: 'INFORMATION TECHNOLOGY', label: 'INFORMATION TECHNOLOGY' },
    { value: 'MECHANICAL', label: 'MECHANICAL' }
  ];

  const admissionmodeselect=[
    {value:'',label:'Study Mode'},
    {value:'REGULAR',label:"REGULAR"},
    {value:'DIRECT SECOUND YEAR',label:'DIRECT SECOUND YEAR'}
  ];

  const staymodeselect =[
    {value:'',label:'Stay Mode'},
    {value:'Day Scholor',label:'Day Scholor'},
    {value:'Hosteler',label:'Hosteler'}
  ];

  const travelmodeselect=[
    {value:'',label:'Travel Mode'},
    {value:'College Bus',label:'College Bus'},
    {value:'Out Bus',label:'Out Bus'}
  ];

  const statusselect=[
    {value:'',label:'Status'},
    {value:'Active',label:'Active'},
    {value:'Non Active',label:'Non Active'}
  ]
//.............................................................................



//To control Back Button
const backbutton = async()=>{
  if(Departmentselect){
    setbatchselect(true);
    setDepartmentselect(false);
    setcurrentbatch('');
    
  };
  if(Addstudentbtn){
    setAddstudentbtn(false);
    setbatchselect(true);
  };
  if(Studentsselect){
    setDepartmentselect(false);
    setStudentsselect(false);
    setbatchselect(false);
    
    
  };
  if(!Departmentselect && !batchselect&& !Studentsselect && !Addstudentbtn){
    setDepartmentselect(true);
    
  };
  if(studenteditbtn){
    setstudenteditbtn(false);
    setDepartmentselect(false);
    setStudentsselect(true);
    setbatchselect(false);
  };
  
  
}



//-------------------------------------------------


  return (
    <div className="studentconmain">
      <h2>Manage Students</h2>
      <div className="topcontainer">
          <div className="topleft">
            <input
             placeholder='Search'
             value={Searchbox}
             onChange={(e)=>{setSearchbox(e.target.value.toUpperCase())}}
            />
            <div className="topleftbtn">

            <button>Search</button>

            <button onClick={backbutton}>Back</button>
            
            </div>
            
          </div>

          <div className="topright">
          <ul>
              <li onClick={() => {
                setstudentid('');
                setcourtesyTitle('');
                setstudentname('');
                setregnumber('');
                setgender('');
                setdob('');
                setdepartment('');
                setbatch('');
                setcontactnumber('');
                setemail('');
                setplace('');
                setaddress('');
                setparentname('');
                setpcontactnumber('');
                setadmissionmode('');
                setstaymode('');
                settravelmode('');
                setstatus('');
                setadmiteddate('');
                setlastedited('');
                setAddstudentbtn(true);
                }}>
              <span>Add Student</span>
              <img src="adminimg/addstaff.png" alt="Add Staff" width="30px" />
              </li>
            </ul>
          </div>
      </div>

      <div className="studentcontent">
         {Addstudentbtn?(
          <div className="addstucon">
              <h2>Add student</h2>
              <div className="studetailcon">
              <div className="studentconsub">
                <label>Mr/Miss/Mrs</label>
                <select
                value={courtesyTitle}
                onChange={(e) => setcourtesyTitle(e.target.value)}
                required
                >
                  {courtesy_titlename.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                     {optionS.label}
                    </option>
                  ))}
                </select>

                <label>Student Name</label>
                <input
                value={studentname}
                placeholder='student Name'
                onChange={(e)=>setstudentname(e.target.value.toUpperCase())}
                />

                <label>Register Number</label>
                <input
                type='tel'
                placeholder='AU Reg Number'
                value={regnumber}
                onChange={(e)=>setregnumber(e.target.value)}
                />
                <label>Gender</label>
                <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                required
                >
                  {genderselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                       {optionS.label}
                    </option>
                  ))}
               </select>

               <label>DOB</label>
               <input
               value={dob}
               type='date'
               onChange={(e)=>setdob(e.target.value)}
               />

               <label>Department</label>
               <select
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
                required
               >
                  {departmentOptions.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
              </select>

              <label>Batch</label>
              <input
                type="tel"
                placeholder="2023"
                value={batch}
                onChange={(e) =>{ 
                  setbatch(e.target.value);
                  setbatchmessage('');
                }}
              />
              <p>{batchmessage}</p>

              <label>Contact Number</label>
              <input
              type="tel"
              value={contactnumber}
              placeholder='Contact Number'
              onChange={(e)=>setcontactnumber(e.target.value)}
              />
              <p>{contactnumessage}</p>

              <label>Email</label>
              <input
              value={email}
              type='email'
              onChange={(e)=>{setemail(e.target.value.toLowerCase())
                   setemailmessage('')
              }}
              placeholder='example@gmail.com'
              />
              <p>{emailmessage}</p>

              <label>Place</label>
              <input
              value={place}
              onChange={(e)=>setplace(e.target.value.toUpperCase())}
              />

              <label>Address</label>
              <input
              value={address}
              onChange={(e)=>setaddress(e.target.value.toUpperCase())}
              />

              <label>Parent Name</label>
              <input
              value={parentname}
              onChange={(e)=>setparentname(e.target.value.toUpperCase())}
              />
              

              <label>Parent Contact Number</label>
              <input
              type='tel'
              value={pcontactnumber}
              onChange={(e)=>setpcontactnumber(e.target.value)}
              />
              <p>{pcontactnumessage}</p>

              <label>Admission Mode</label>
              <select
                value={admissionmode}
                onChange={(e) => setadmissionmode(e.target.value)}
                required
               >
                  {admissionmodeselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
               </select>

               <label>Study Mode</label>
              <select
                value={staymode}
                onChange={(e) => setstaymode(e.target.value)}
                required
               >
                  {staymodeselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
               </select>

               <label>Travel Mode</label>
               <select
               value={travelmode}
               onChange={(e)=> settravelmode(e.target.value)}
               >
                 {travelmodeselect.map((optionS)=>(
                  <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                  </option>
                 ))}
               </select>

              <label>Status</label>
              <select
               value={status}
               onChange={(e)=> setstatus(e.target.value)}
               >
                 {statusselect.map((optionS)=>(
                  <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                  </option>
                 ))}
               </select>

               <label>Date Of Admition</label>
               <input
               value={admiteddate}
               type='date'
               onChange={(e)=>setadmiteddate(e.target.value)}
               />

               <div className="addstubtn">
                <button onClick={handeladdstudent}>Add Student</button>
               </div>

               </div>
              </div>
          </div>
         ):(
          <>
          {batchselect ?(
            <div className="stubatchpcon">
              <h2>Batches</h2>
              <div className="batchcards" >
                {carddata.length>0 ?(
                  <>
                  {carddata.map((year,index)=>(
                    <div className="batchcard" key={index} onClick={()=>{
                      setbatchselect(false);
                      setDepartmentselect(true);
                      setcurrentbatch(year);
                      
                    }}>
                        <h2>BATCH</h2><h3>{year}</h3>
                    </div>
                  ))}
                  </>
                ):(
                  <>
                  <p>No Batchs Available</p>
                  </>
                )}
                
              </div>
            </div>
          ):(
            <div className="student-batch-false">
              {Departmentselect ?(
                <div className="department-main">
                  <h2>Departments</h2>
                  <div className="depcards">
                     {carddata.length>0 ?(
                      <>
                      {carddata.map((departments,index)=>(
                      <div className="depcard" key={index} onClick={()=>{
                        setDepartmentselect(false);
                        setcurrentdepartment(departments);
                        setsearchdistinct('');

                      }} >
                          <h3>{departments}</h3>
                      </div>
                      ))}
                      </>
                     ):(
                      <>
                      <p>Card Data Not Available</p>
                      </>
                     )}
                     
              </div>
                </div>
              ):(
                <>
                {Studentsselect?(
                  <>
                    <div className="studentdetails">
                      {studenteditbtn?(
                        <div className="studenteditok">
                            <div className="studetailcon">
              <div className="studentconsub">
                <label>Mr/Miss/Mrs</label>
                <select
                value={courtesyTitle}
                onChange={(e) => setcourtesyTitle(e.target.value)}
                required
                >
                  {courtesy_titlename.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                     {optionS.label}
                    </option>
                  ))}
                </select>

                <label>Student Name</label>
                <input
                value={studentname}
                placeholder='student Name'
                onChange={(e)=>setstudentname(e.target.value.toUpperCase())}
                />

                <label>Register Number</label>
                <input
                type='tel'
                placeholder='AU Reg Number'
                value={regnumber}
                onChange={(e)=>setregnumber(e.target.value)}
                />
                <label>Gender</label>
                <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                required
                >
                  {genderselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                       {optionS.label}
                    </option>
                  ))}
               </select>

               <label>DOB</label>
               <input
               value={dob}
               type='date'
               onChange={(e)=>setdob(e.target.value)}
               />

               <label>Department</label>
               <select
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
                required
               >
                  {departmentOptions.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
              </select>

              <label>Batch</label>
              <input
                type="tel"
                placeholder="2023"
                value={batch}
                onChange={(e) =>{ 
                  setbatch(e.target.value);
                  setbatchmessage('');
                }}
              />
              <p>{batchmessage}</p>

              <label>Contact Number</label>
              <input
              type='tel'
              value={contactnumber}
              placeholder='Contact Number'
              onChange={(e)=>setcontactnumber(e.target.value)}
              />
              <p>{contactnumessage}</p>

              <label>Email</label>
              <input
              value={email}
              onChange={(e)=>setemail(e.target.value.toLowerCase())}
              placeholder='example@gmail.com'
              />

              <label>Place</label>
              <input
              value={place}
              onChange={(e)=>setplace(e.target.value.toUpperCase())}
              />

              <label>Address</label>
              <input
              value={address}
              onChange={(e)=>setaddress(e.target.value.toUpperCase())}
              />

              <label>Parent Name</label>
              <input
              value={parentname}
              onChange={(e)=>setparentname(e.target.value.toUpperCase())}
              />
              

              <label>Parent Contact Number</label>
              <input
              type='tel'
              value={pcontactnumber}
              onChange={(e)=>setpcontactnumber(e.target.value)}
              />
              <p>{pcontactnumessage}</p>

              <label>Admission Mode</label>
              <select
                value={admissionmode}
                onChange={(e) => setadmissionmode(e.target.value)}
                required
               >
                  {admissionmodeselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
               </select>

               <label>Study Mode</label>
              <select
                value={staymode}
                onChange={(e) => setstaymode(e.target.value)}
                required
               >
                  {staymodeselect.map((optionS) => (
                    <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                    </option>
                  ))}
               </select>

               <label>Travel Mode</label>
               <select
               value={travelmode}
               onChange={(e)=> settravelmode(e.target.value)}
               >
                 {travelmodeselect.map((optionS)=>(
                  <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                  </option>
                 ))}
               </select>

              <label>Status</label>
              <select
               value={status}
               onChange={(e)=> setstatus(e.target.value)}
               >
                 {statusselect.map((optionS)=>(
                  <option key={optionS.value} value={optionS.value}>
                      {optionS.label}
                  </option>
                 ))}
               </select>

               <label>Date Of Admition</label>
               <input
               value={admiteddate}
               type='date'
               onChange={(e)=>setadmiteddate(e.target.value)}
               />

               <div className="addstubtn">
                <button onClick={updatestudent}>Update Student</button>
               </div>

               </div>
              </div>
                        </div>
                      ):(
                        <div className="studenteditno">
                          <h2>Selected Student</h2>
                          <div className="studenteditnocon">
                            <p>Student Name: {studentname}</p>
                            <p>Student Id:  {studentid}</p>
                            <p>Register Number:  {regnumber}</p>
                            <p>Gender: {gender}</p>
                            <p>DOB: {dob}</p>
                            <p>Department: {department}</p>
                            <p>Batch: {batch}</p>
                            <p>Contact Number: {contactnumber}</p>
                            <p>Email: {email}</p>
                            <p>Place: {place}</p>
                            <p>Address: {address}</p>
                            <p>Parent Name: {parentname}</p>
                            <p>Parent Contact Number: {pcontactnumber}</p>
                            <p>Admission Mode: {admissionmode}</p>
                            <p>Stay Mode: {staymode}</p>
                            <p>Travel Mode: {travelmode}</p>
                            <p>AdmitedDate: {admiteddate}</p>
                            <p>Status:{status}</p>
                            <button onClick={()=>{
                              setstudenteditbtn(true);
                            }}>Edit</button>

                            <div className="deletestu">
                            <input
                            placeholder='DELETE STUDENT'
                            value={deleteverifys}
                            onChange={(e)=>{setdeleteverifys(e.target.value)}}
                            />
                            <button onClick={ deletestudent}>Delete</button>
                            </div>
                            <p>Last Edited by:{lastedited}</p>
                            
                          </div>

                        </div>
                      )}
                    </div>
                  </>
                ):(
                  <div className="department-false">
                  <div className="selectstudents">
                      <h2>Students</h2>
                    <div className="studentscards">
                        {studentsdata.length > 0 ? (
                           <div className="studentscard">
                               {studentsdata.map((user) => (
                               <div 
                                 key={user.studentid}
                                 className="studentcard"
                                 onClick={() => {

                                 setsearchstuid(user.studentid);
                                 setStudentsselect(true);
                                 setDepartmentselect(false);
                                 
                                 
                                }}>
                                   <div className="studentcardcon">
                                        <h5>{user.courtest_title}  . {user.studentname}</h5>
                                        <p>Student ID: {user.studentid}</p>
                                        <p>Reg Number:{user.regnumber}</p>
                                        <p>Department: {user.department}</p>
                                        <p>Batch: {user.batch}</p>
                                   </div>

                                  <div className="studentphotos">
                                      <img src="profileholder.png" alt="Profile" />
                                  </div>
                               </div>
                                 ))}
                            </div>
                        ) : (
                           <p>No User found</p>
                           )}

                     </div>
                     </div>
                  </div>
                )}
                
                </>

              )}
              
              </div>
          )}
          
          </>
         )}
      </div>
    </div>
  )
}

export default Managestudents
