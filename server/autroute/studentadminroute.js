const express=require('express');
const router=express.Router();
const StudentModel=require('../schemas/studentschema');
const {Verifytoken}=require("../verifytoken");
const UserModel=require("../schemas/loginuserschema")

//Route to get student details
router.post('/getstudent',Verifytoken,async(req , res)=>{
    if (req.userdata.role === "admin"){

    if(req.body.distinctes){
        try{
            const studentdata=await StudentModel.distinct(req.body.distinctes);
           return res.status(200).json({studentdata,success:true, token: req.newToken})
        }catch(error){
           return res.status(203).json({message:"Unable to fetch data", token: req.newToken})
        }
    };
    
    if(req.body.studentid){
        try{
            const selectstudentdata=await StudentModel.find({studentid:req.body.studentid});
            return res.status(200).json({selectstudentdata,sssuccess:true, token: req.newToken});
        }catch(error){
            return res.status(203).json({message:"Unable to fetch data", token: req.newToken})
        }
    }
   

    //-----------------------------------------------------------------

    try{
       const StudentData= await StudentModel.find(req.body.searchfilter||undefined,{studentid:1,courtest_title:1,studentname:1,regnumber:1,department:1,batch:1});
       return res.status(200).json({StudentData, token: req.newToken});
    }catch(err){
        console.log("Error in getting Student details:",err)
        return res.status(203).json({message:"Error in geting Student Data", token: req.newToken});
        
    };
}
});

//-------------------------------------------------------------------
//Route to Add Students
router.post('/addstudent',Verifytoken,async(req,res)=>{
    if (req.userdata.role === "admin"){
  const {courtest_title,studentname,regnumber,gender,dob,department,
    batch,contactnumber,email, place,address,parentname,pcontactnumber,
    admissionmode,staymode,travelmode,status,admiteddate,lastedited} =req.body;

    
  if(!courtest_title||!studentname||!regnumber||!gender||!dob||!department||
    !batch||!contactnumber||!email||!place||!address||!parentname||!pcontactnumber||
    !admissionmode||!staymode||!travelmode||!status||!admiteddate||!lastedited){
        return res.status(203).json({message:"All fields are required", token: req.newToken});    
  };

//-----------------
//To find the next student Id
async function findGreatestStuId(department,batch,admissionmode) {
              const collegecode=9640;
              let departmentcode;
              let admission;
              let laststudent;
              
                
              if (department==="ARTIFICIAL INTELLIGENCE AND DATA SCIENCE"){
                    departmentcode="AI"
              }else if (department==="COMPUTER SCIENCE ENGINEERING"){
                    departmentcode="CSE"
              }else if(department==="ELECTRONICS AND COMMUNICATION ENGINEERING"){
                    departmentcode="ECE"
              }else if(department==='ELECTRICAL AND ELECTRONICS ENGINEERING'){
                    departmentcode="EEE"
              }else if(department==='INFORMATION TECHNOLOGY'){
                    departmentcode="IT"
              }else if(department==='MECHANICAL'){
                    departmentcode="MECH"
              }else{
                departmentcode="AA"
              }
//-------------------------------------------------------------------------------
              
              if (admissionmode==="REGULAR"){
                    admission="R"
              }else if(admissionmode==="DIRECT SECOUND YEAR"){
                    admission="D"
              }
//-------------------------------------------------------------------------------
              try{
                laststudent = await StudentModel.findOne({ department, batch}).sort({ studentid: -1 }).exec();

                let newrollnumber;

                if(laststudent){
                    const lastrollnumber=laststudent.studentid;
                    const lastnumber=parseInt(lastrollnumber.slice(-3),10);
                    const newnumber=(lastnumber+1).toString().padStart(3,"0");
                    
                    newrollnumber=`${collegecode}${batch}${admission}${departmentcode}${newnumber}`;
                }else{
                    
                    newrollnumber=`${collegecode}${batch}${admission}${departmentcode}001`;
                }

                return newrollnumber;

              }catch(error){
                console.error("Error fetching Student ID:", error);
              }
              

          };

//To save the Student details
try{
    const regnumbercheck=await StudentModel.find({regnumber:regnumber});
    if(regnumbercheck.length>0){
        
        return res.status(203).json({message:"Register Number Already Exist!", token: req.newToken})
    }
    const stuID=await findGreatestStuId(department,batch,admissionmode);

    const newstudent= new StudentModel({
        studentid:stuID,
        courtest_title,
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
        lastedited

    });

    const newUser = new UserModel({
                    username: stuID,
                    password:dob,
                    email,
                    role:'student',
                    name: studentname,
                });
     await newstudent.save();
     await newUser.save();
    return res.status(200).json({message:"Student Added  Successfully!",success:true, token: req.newToken})
}catch(error){
    
    return res.status(203).json({message:"Error in adding student details", token: req.newToken})
    
};
    }
});

router.put("/studentupdate", Verifytoken, async (req, res) => {
    if (req.userdata.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized access", token: req.newToken });
    }

    //Initializing new roll number 
    let newrollnumber;

    // to set the new roll number 
    try{
            const collegecode=9640;
            let departmentcode;
            let admission;
              
        const { studentid, ...updateData } = req.body;
        const studentdata=await StudentModel.find({studentid:studentid});
        console.log("Studendold data:",studentdata)


        if (updateData.admissionmode==="REGULAR"){
            admission="R"
            }else if(updateData.admissionmode==="DIRECT SECOUND YEAR"){
             admission="D"
             }

        if (updateData.department==="ARTIFICIAL INTELLIGENCE AND DATA SCIENCE"){
            departmentcode="AI"
            }else if (updateData.department==="COMPUTER SCIENCE ENGINEERING"){
            departmentcode="CSE"
            }else if(updateData.department==="ELECTRONICS AND COMMUNICATION ENGINEERING"){
            departmentcode="ECE"
            }else if(updateData.department==='ELECTRICAL AND ELECTRONICS ENGINEERING'){
            departmentcode="EEE"
            }else if(updateData.department==='INFORMATION TECHNOLOGY'){
            departmentcode="IT"
            }else if(updateData.department==='MECHANICAL'){
            departmentcode="MECH"
            }

        
        if (studentdata[0].department!=updateData.department||studentdata[0].batch!=updateData.batch||studentdata[0].admissionmode!=updateData.admissionmode){
            const laststudent = await StudentModel.findOne( {department:updateData.department, batch:updateData.batch}).sort({ studentid: -1 }).exec();
            if(laststudent){       
                const lastrollnumber=laststudent.studentid;
                const lastnumber=parseInt(lastrollnumber.slice(-3),10);
                const newnumber=(lastnumber+1).toString().padStart(3,"0");

                newrollnumber=`${collegecode}${updateData.batch}${admission}${departmentcode}${newnumber}`;
            }else{
                newrollnumber=`${collegecode}${updateData.batch}${admission}${departmentcode}001`;
            }
        }

    }catch(error){
        console.log(error)
    }

//-------------------------------------------------------------------------------------------------------------------

    if(!newrollnumber){
        try {
        const { studentid, ...updateData } = req.body;

        if (!studentid) {
            return res.status(400).json({ message: "StudentId is required for update", token: req.newToken });
        }

        
        
        const updatedStudent = await StudentModel.updateOne({ studentid }, { $set: updateData });
        const updatedUser = await UserModel.updateOne(
            { username: studentid },
            { $set: { name: updateData.studentname, email: updateData.email } }
        );

        if(updatedStudent.modifiedCount>0|| updatedUser.modifiedCount>0){
            return res.status(200).json({message:"Student details updated",success:true,token: req.newToken})
        }else{
            return res.status(203).json({message:"No Changes made",success:false,token: req.newToken})
        }

        
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message, token: req.newToken });
    }
    }else{
        const { studentid, ...updateData } = req.body;

        const newstudent= new StudentModel({
            studentid:newrollnumber,
            courtest_title:updateData.courtest_title,
            studentname:updateData.studentname,
            regnumber:updateData.regnumber,
            gender:updateData.gender,
            dob:updateData.dob,
            department:updateData.department,
            batch:updateData.batch,
            contactnumber:updateData.contactnumber,
            email:updateData.email, 
            place:updateData.place,
            address:updateData.address,
            parentname:updateData.parentname,
            pcontactnumber:updateData.pcontactnumber,
            admissionmode:updateData.admissionmode,
            staymode:updateData.staymode,
            travelmode:updateData.travelmode,
            status:updateData.status,
            admiteddate:updateData.admiteddate,
            lastedited:updateData.lastedited
    
        });

        const newUser = new UserModel({
            username: newrollnumber,
            password:updateData.dob,
            email:updateData.email,
            role:'student',
            name: updateData.studentname,
        });
        await newstudent.save();
        await newUser.save();

        const deletedstudent = await StudentModel.deleteOne({ studentid });
        const deletedUser = await UserModel.deleteOne({ username: studentid });

        if (deletedstudent.deletedCount > 0 && deletedUser.deletedCount > 0) {
            return res.status(200).json({ message: "Student updated successfully", token: req.newToken, fullsuccess: true });
        } else {
            return res.status(203).json({ message: "No Changes Made!", token: req.newToken });
        }
    }
});

router.delete("/studentdelete", Verifytoken, async (req, res) => {
    if (req.userdata.role === "admin") {
        try {
            const {studentid}  = req.body;
            
            if (!studentid) {
                return res.status(203).json({ message: "Staff ID is required", token: req.newToken });
            }

            const deletedstudent = await StudentModel.deleteOne({ studentid });
            const deletedUser = await UserModel.deleteOne({ username: studentid });

            if (deletedstudent.deletedCount > 0 || deletedUser.deletedCount > 0 ) {
                return res.status(200).json({ message: "Student deleted successfully", token: req.newToken, success: true });
            } else {
                return res.status(203).json({ message: "No Changes Made", token: req.newToken });
            }
        } catch (error) {
            console.error("Error deleting Student:", error.message);
           return res.status(203).json({ message: "Unable to delete Student", token: req.newToken });
        }
    }
});


module.exports = router;