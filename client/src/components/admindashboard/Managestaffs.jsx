import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './css/Managestaff.css';

function Managestaffs() {

  const navigate = useNavigate();

  const backendurl='http://192.168.1.23:3000/';
  const [searchbox, setSearchbox] = useState('');
  const [searchdata, setSearchdata] = useState('');
  const [userdata, setUserdata] = useState([]);
  const [staffselect, setStaffSelect] = useState(false);
  const [addstaffbtn, setAddStaffBtn] = useState(false);
  const [editStaff, setEditStaff] = useState(false);
  const [deleteVerify, setDeleteVerify] = useState('');

  



  const [staffId, setStaffId] = useState('');
  const [courtesyTitle,setcourtesyTitle]=useState('');
  const [staffName, setStaffName] = useState('');
  const [gender,setgender]=useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email,setemail]=useState('');
  const [place, setPlace] = useState('');
  const [address,setaddress]=useState('');
  const [specialdesignation,setspecialdesignation]=useState('');
  const [role, setRole] = useState('');
  const [joinedDate, setjoinedDate] = useState('');
  const [dob,setdob]=useState('');
//--------------------------------------------------------------

  // Reset Search Box
  useEffect(() => {
    if (searchdata.length <1) {
      setSearchdata('');
      
    }
  }, [searchdata, searchbox]);

  
//--------------------------------------------------------------

//Used to set Staff Edit Details

  useEffect(() => {
    if (staffselect) {
      const selectedStaff = userdata.find((user) => user.staffname === searchbox);
      if (selectedStaff) {
        setStaffId(selectedStaff.staffid);
        setcourtesyTitle(selectedStaff.courtesy_title);
        setStaffName(selectedStaff.staffname);
        setgender(selectedStaff.gender);
        setDesignation(selectedStaff.designation);
        setDepartment(selectedStaff.department);
        setContactNumber(selectedStaff.contact_no);
        setemail(selectedStaff.email);
        setPlace(selectedStaff.place);
        setaddress(selectedStaff.address);
        setspecialdesignation(selectedStaff.special_designation);  
        setRole(selectedStaff.role);
        setjoinedDate(selectedStaff.joined_date);
        setdob(selectedStaff.dob);
        
      };
      if (addstaffbtn){
                setcourtesyTitle('');
                setStaffName('');
                setgender('');
               setDesignation('');
               setDepartment('');
               setContactNumber('');
               setemail('');
               setPlace('');
               setRole('');
               setaddress('');
               setspecialdesignation('');
               setStaffId('');
               setdob(' ');
               setjoinedDate(' ');
               
                
      }
    }
  }, [staffselect, userdata, searchbox,editStaff]);

//------------------------------------------------

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      var cardsort
      try {
        if(searchbox.length >=1){
         cardsort={staffid:1,courtesy_title:1, staffname:1,gender:1, designation:1, department:1, contact_no:1,email:1, place:1,address:1,special_designation:1,role:1,joined_date:1,dob:1};
        }else{
         cardsort={staffid:1,courtesy_title:1,staffname:1, designation:1, department:1};
        }

        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          `${backendurl}admin/getstaff`,
          { iddata:{staffname: searchbox || undefined},sortdata:cardsort },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data.loginstatus==='false'){
          alert("Ivalid Token Loging Out....")
          sessionStorage.removeItem('isLoggedin');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem("token");
          navigate('/');
        }
        sessionStorage.setItem('token', response.data.token); // Update token
        setUserdata(response.data.staffDetails); // Update user data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchbox,staffselect,editStaff,addstaffbtn]);

//----------------------------------------------------------

  // Add staff
  const addStaff = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const newStaff = {
        courtesy_title:courtesyTitle,
        staffname: staffName,
        gender,
        dob,
        designation,
        department,
        contactNumber,
        email,
        place,
        address,
        special_designation:specialdesignation,
        role,
        joined_date:joinedDate
      };

      const response = await axios.post(
        `${backendurl}admin/staffadd`,
        newStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.loginstatus==='false'){
        alert("Ivalid Token Loging Out....")
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem("token");
        navigate('/');
      }
      sessionStorage.setItem('token', response.data.token); // Update token
      alert(response.data.message); // Show success message

      if (response.data.success) {
        // Reset form fields
        setStaffName('');
        setcourtesyTitle('');
        setgender('');
        setDesignation('');
        setDepartment('');
        setContactNumber('');
        setemail('');
        setPlace('');
        setaddress('');
        setspecialdesignation('');
        setRole('');
        setdob('');
        setjoinedDate('');
      }
    } catch (error) {
      alert('Error adding staff: ' + error.message);
    }
  };


  //------------------------------------------------

  //To Handle Staff Update

  const handleSave = async() => {
    try {
      const token = sessionStorage.getItem('token');
      const newStaff={
          staffid:staffId,
          courtesy_title:courtesyTitle,
          staffname: staffName,
          gender,
          dob,
          designation,
          department,
          contactNumber,
          email,
          place,
          address,
          special_designation:specialdesignation,
          role,
          joined_date:joinedDate,
      };
      
      const response = await axios.put(
        `${backendurl}admin/staffupdate`,
        newStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.loginstatus==='false'){
        alert("Ivalid Token Loging Out....")
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem("token");
        navigate('/');
      }
      sessionStorage.setItem("token",response.data.token);
      
      alert(response.data.message);
      

    if (response.data.success){
      setEditStaff(false);
     
  }
    }catch(error){
      alert(error)
    }

 };
 //--------------------------------
 //To handel staff Delete

 const handleDelete = async () => {
  if (deleteVerify === 'DELETE USER') {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`${backendurl}admin/staffdelete`, {
        data: { staffid: staffId },
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (response.data.loginstatus==='false'){
        alert("Ivalid Token Loging Out....")
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem("token");
        navigate('/');
      }
      sessionStorage.setItem('token', response.data.token);
      alert(response.data.message);
      if (response.data.success){
        setStaffSelect(false);
        setDeleteVerify('');
        setSearchbox('');
      };
    } catch (error) {
      console.error('Error deleting staff:', error.message);
    }
  }
};

  // Role dropdown options
  const staffOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' },
    {value:'superstaff',label:'Super Staff'}
  ];

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
  //Department options
  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', label: 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE' },
    { value: 'COMPUTER SCIENCE ENGINEERING', label: 'COMPUTER SCIENCE ENGINEERING' },
    { value: 'ELECTRONICS AND COMMUNICATION ENGINEERING', label: 'ELECTRONICS AND COMMUNICATION ENGINEERING' },
    { value: 'ELECTRICAL AND ELECTRONICS ENGINEERING', label: 'ELECTRICAL AND ELECTRONICS ENGINEERING' },
    { value: 'INFORMATION TECHNOLOGY', label: 'INFORMATION TECHNOLOGY' },
    { value: 'MECHANICAL', label: 'MECHANICAL' }
  ];

  return (
    <div className="staffcontent">
      <div className="stafftop">
        <h3>Manage Staffs</h3>
        <div className="top_buttons">
          <div className="searchbutton">
            <input
              placeholder="Search Staff"
              value={searchdata}
              onChange={(event) => setSearchdata(event.target.value.toUpperCase())}
            />
            <button onClick={() => setSearchbox(searchdata)}>Search</button>
            <button
              onClick={() => {
                setSearchbox('');
                setAddStaffBtn(false);
                setSearchdata('');
                setcourtesyTitle('');
                setStaffName('');
                setgender('');
               setDesignation('');
               setDepartment('');
               setContactNumber('');
               setemail('');
               setPlace('');
               setRole('');
               setaddress('');
               setspecialdesignation('');
               setStaffId('');
               setStaffSelect(false);
               setEditStaff(false);
              }}
            >
              Back
            </button>
          </div>
          <div className="addstaff">
            <ul>
              <li onClick={() => {setAddStaffBtn(true);
                
              }}>
                <span>Add Staff</span>
                <img src="adminimg/addstaff.png" alt="Add Staff" width="30px" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="staffbottom">
        {addstaffbtn ? (
          <div className="staffaddpor">
            <h1>Add Staff</h1>
            <div className="staffaddportop">
            
            <div className="addstafffill">
             
             <label>MR/MISS/MRS</label>
             <select
                id="courtesy_titlename"
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

              <label>Staff Name</label>
              <input
                placeholder="Name"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value.toUpperCase())}
                required
              />
              <label>Gender</label>
              <select
                id="genderselect"
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
             type='date'
             value={dob}
             onChange={(e)=>setdob(e.target.value)}
             />
              <label>Designation</label>
              <input
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(event.target.value.toUpperCase())}
                required
              />
              <label>Department</label>
              <select
                id="departmentSelect"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                {departmentOptions.map((optionS) => (
                  <option key={optionS.value} value={optionS.value}>
                    {optionS.label}
                  </option>
                ))}
              </select>
              <label>Contact Number</label>
              <input
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <label>Email</label>
              <input
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setemail(e.target.value.toLowerCase())}
                required
              />
              <label>Place</label>
              <input
                placeholder="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value.toUpperCase())}
                required
              />
              <label>Address</label>
              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setaddress(e.target.value.toUpperCase())}
                required
              />
              <label>Special Role</label>
              <input
                placeholder="Class Incharge etc.."
                value={specialdesignation}
                onChange={(e) => setspecialdesignation(e.target.value.toUpperCase())}
                required
              />
              <label>Select Role:</label>
              <select
                id="staffSelect"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                {staffOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label>Joined Date:</label>
             <input
             type='date'
             value={joinedDate}
             onChange={(e)=>setjoinedDate(e.target.value)}
             />
              <button onClick={addStaff}>Add Staff</button>
            </div>
            </div>
          </div>
        ) : (
          <div className="staffview">
            <h1>Selected Staff</h1>
            {staffselect ? (
              <div className="staffviews">
              <div className="staffselview">
                  {editStaff ? (
                    <div className="selstaffedit">
                     
                     <div className="s1">
                         <label>MR/MISS/MRS</label>
                          <select
                                id="courtesy_titlename"
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
                    </div>
                     
                    <div className="s1">
                          <label>Staff Name</label>
                          <input
                               value={staffName}
                               onChange={(e) => setStaffName(e.target.value.toUpperCase())}
                          />
                    </div>
                      
                    <div className="s1">
                    <label>Gender</label>
                         <select
                             id="genderselect"
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
                    </div>
                    <div className="s1">
                          <label>DOB</label>
                           <input
                            type='date'
                            value={dob}
                            onChange={(e)=>setdob(e.target.value)}
                           />
                     </div>
                    <div className="s1">
                      <label>Designation</label>
                      <input
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value.toUpperCase())}
                      />
                    </div>

                    <div className="s1">
                      <label>Department</label>
                      <select
                        id="departmentSelect"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      >
                      {departmentOptions.map((optionS) => (
                          <option key={optionS.value} value={optionS.value}>
                          {optionS.label}
                          </option>
                       ))}
                       </select>
                    </div>

                    <div className="s1">
                       <label>Contact Number</label>
                       <input
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </div>

                    <div className="s1">
                    <label>EmailId</label>
                      <input
                        value={email}
                        onChange={(e) => setemail(e.target.value.toLowerCase())}
                      />
                    </div>

                    <div className="s1">
                      <label>Place</label>
                      <input
                        value={place}
                        onChange={(e) => setPlace(e.target.value.toUpperCase())}
                      />
                    </div>

                    <div className="s1">
                      <label>Address</label>
                      <input
                        value={address}
                        onChange={(e) => setaddress(e.target.value.toUpperCase())}
                      />
                    </div>

                      <div className="s1">
                      <label>Special Role</label>
                      <input
                        value={specialdesignation}
                        onChange={(e) => setspecialdesignation(e.target.value.toUpperCase())}
                      />
                      </div>
                      <div className="s1">
                      <label>Role</label>
                      <select
                        id="staffSelect"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                         required
                        >
                        {staffOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                         </option>
                              ))}
                       </select>
                      </div>

                      <label>Joined Date:</label>
                      <input
                      type='date'
                      value={joinedDate}
                      onChange={(e)=>setjoinedDate(e.target.value)}
                      />
                      <div className="savebtn">
                      <button onClick={handleSave}>Save</button>
                      </div>
                      
                    </div>
                  ) : (
                    <>
                    <div className="selstaffview">
                      <p>Staff Name: {courtesyTitle} . {staffName}</p>
                      <p>Staff ID: {staffId}</p>
                      <p>Gender:{gender}</p>
                      <p>DOB: {dob}</p>
                      <p>Designation: {designation}</p>
                      <p>Department: {department}</p>
                      <p>Contact Number: {contactNumber}</p>
                      <p>Email Id: {email}</p>
                      <p>Place: {place}</p>
                      <p>Address: {address}</p>
                      <p>Special Role: {specialdesignation}</p>
                      <p>User Acces Role: {role}</p>
                      <p>Joined Date: {joinedDate}</p>
                      <button onClick={() => setEditStaff(true)}>Edit</button>

                    </div>
                    <div className="deletebtn">
                        
                    <input
                     value={deleteVerify}
                     placeholder='Type DELETE USER to Delete'
                     onChange={(e)=>{setDeleteVerify(e.target.value)}}
                    />
                    <button onClick={handleDelete}>DELETE</button>
                  </div>
                  </>
                  )}
                </div>
                </div>
             
            ) : (
              <div className="allstaffview">
                {userdata.length > 0 ? (
                  <div className="staffcards">
                    {userdata.map((user) => (
                      <div 
                        key={user.staffid}
                        className="staffcard"
                        onClick={() => {
                          setSearchbox(user.staffname);
                          setStaffSelect(true);
                        }}
                      >
                        <div className="staffcardcon">
                          <h5>{user.courtesy_title} . {user.staffname}</h5>
                          <p>Staff ID: {user.staffid}</p>
                          <p>Designation: {user.designation}</p>
                          <p>Department: {user.department}</p>
                        </div>
                        <div className="staffphotos">
                          <img src="profileholder.png" alt="Profile" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No User found</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Managestaffs;