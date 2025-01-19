import React, { useEffect, useState } from 'react'
import "./css/managestudents.css"
import axios from 'axios';



const backendurl='http://192.168.1.23:3000/';


function Managestudents() {

  const [Searchbox,setSearchbox]=useState('');
  const [searchstuname,setsearchstuname]=useState('');
  const [searchstuid,setsearchstuid]=useState('');
  const [searchdistinct,setsearchdistinct]=useState('');


  const [Addstudentbtn,setAddstudentbtn]=useState(false);
  const [batchselect,setbatchselect]=useState(true);
  const [Departmentselect,setDepartmentselect]=useState(false);
  const [Studentselect,setStudentselect]=useState(false);

  const [userdata,setuserdata]=useState([]);
  const [carddata,setcarddata]=useState([]);
  const [sortdatas,setsortdatas]=useState([]);

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
  const [admiteddate,setadmiteddate]=useState('');

  const [batchmessage,setbatchmessage]=useState('');
  const [contactnumessage,setcontactnummessage]=useState('');
  const [pcontactnumessage,setpcontactnummessage]=useState('');

  //Use effect to verify batch 

  useEffect(()=>{
    if(batch.length >4){
      setbatchmessage("The Batch must be in this formate : 2023");
      setbatch('');
      console.log("UseEffect run")
    }
  },[batch]);

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
  }, [contactnumber]);

  useEffect(() => {
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
  }, [pcontactnumber]);

  useEffect(()=>{
    if(Departmentselect){
      setsearchdistinct("department");
      setsortdatas('');
      setsearchstuname('');
      setsearchstuid('');
    };
    if(batchselect){
      setsearchdistinct("batch");
      setsortdatas('');
      setsearchstuname('');
      setsearchstuid('');
    };
    if(Searchbox.length>0){

      setsearchstuname(Searchbox);
      setsortdatas({studentid:1,courtest_title:1,studentname:1,department:1,batch:1});
    };
    if(searchstuid.length>0){
      setsortdatas('');
    };
    
  },[Departmentselect, batchselect,searchdistinct])


  useEffect(() => {

    const fetchdata = async () => {
      if(!searchdistinct){
        return
      }
      try {
        const token = sessionStorage.getItem('token');
        console.log( "Console log from getstudent",searchstuid,searchstuname,searchdistinct,sortdatas)
        const response = await axios.post(
          `${backendurl}admin/getstudent`,
          {studentid:searchstuid,studentname:searchstuname,distinctes:searchdistinct,sortdata:sortdatas},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if(response.cardsuccess){
          setcarddata(response.cardsuccess);
        }

        
      } catch (error) {
        console.log("Unable to fetch student data");
      }
    };
    fetchdata();
  }, [Departmentselect, batchselect,searchdistinct]);

  


  const handeladdstudent= async()=>{
    alert("addbutton clicked")
   try{
        const token = sessionStorage.getItem('token');

        const newstudent={
          courtest_title:courtesyTitle,
          studentname,
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
          studymode,
          staymode,
          travelmode,
          status,
          admiteddate
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
        console.log("response for add send")
        if (response.data.success){
          alert("Student Updated")
        }

        if (response.data.message){
          alert(response.data.message)
        }
        console.log("Received response")
   }catch(error){
    alert(error)
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
if(batchselect)



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
                onChange={(e)=>setstudentname(e.target.value.toUpperCase())}
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
              type='number'
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
              value={pcontactnumber}
              onChange={(e)=>setpcontactnumber(e.target.value)}
              />
              <p>{pcontactnumessage}</p>

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
          {Departmentselect ?(
            <div className="studepcon">

            </div>
          ):(
            <div className="stubatchcon">
              
            </div>
          )}
          </>
         )}
      </div>
    </div>
  )
}

export default Managestudents
