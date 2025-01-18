import React, { useEffect, useState } from 'react'
import "./css/managestudents.css"



function Managestudents() {

  const [Searchbox,setSearchbox]=useState('');
  const [Addstudentbtn,setAddstudentbtn]=useState(false);
  const [Departmentselect,setDepartmentselect]=useState(false);
  const [Studentselect,setStudentselect]=useState(false);

  const [courtesyTitle,setcourtesyTitle]=useState('');
  const [studentname,setstudentname]=useState('');
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
  const [studymode,setstudymode]=useState('');
  const [staymode,setstaymode]=useState('');
  const [travelmode,settravelmode]=useState('');
  const [status,setstatus]=useState('');

  const [batchmessage,setbatchmessage]=useState('');

  //Use effect to verify batch 

  useEffect(()=>{
    if(batch.length >4){
      setbatchmessage("The Batch must be in this formate : 2023");
      setbatch('');
      console.log("UseEffect run")
    }
  },[batch]);

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

  const studymodeselect=[
    {value:'',label:'Study Mode'},
    {value:'Full Time',label:"Full Time"},
    {value:'Part Time',label:'Part Time'}
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

            <button onClick={()=>{
              setSearchbox('');
              setAddstudentbtn('');
              setDepartmentselect('');
              setStudentselect('');
            
            }}>Back</button>
            
            </div>
            
          </div>

          <div className="topright">
          <ul>
              <li onClick={() => {setAddstudentbtn(true);
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
                onChange={(e)=>setstudentname(e.target.value.toUpperCase)}
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
                type="number"
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
              value={contactnumber}
              placeholder='Contact Number'
              onChange={(e)=>setcontactnumber(e.target.value)}
              />

              <label>Email</label>
              <input
              value={email}
              onChange={(e)=>setemail(e.target.value.toLowerCase)}
              placeholder='example@gmail.com'
              />

              <label>Place</label>
              <input
              value={place}
              onChange={(e)=>setplace(e.target.value.toUpperCase)}
              />

              <label>Address</label>
              <input
              value={address}
              onChange={(e)=>setaddress(e.target.value.toUpperCase)}
              />

              <label>Parent Name</label>
              <input
              value={parentname}
              onChange={(e)=>setparentname(e.target.value.toUpperCase)}
              />

              <label>Parent Contact Number</label>
              <input
              value={pcontactnumber}
              onChange={(e)=>setpcontactnumber(e.target.value)}
              />

              <label>Study Mode</label>
              <select
                value={studymode}
                onChange={(e) => setstudymode(e.target.value)}
                required
               >
                  {studymodeselect.map((optionS) => (
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

               <div className="addstubtn">
                <button>Add Student</button>
               </div>


               </div>
              </div>
          </div>
         ):(
          <div className="stubatchcon">
              <h1>Student detail</h1>
          </div>
         )}
      </div>
    </div>
  )
}

export default Managestudents
