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
    studymode,staymode,travelmode,status,admiteddate} =req.body;

    console.log(courtest_title,studentname,regnumber,gender,dob,department,
        batch,contactnumber,email, place,address,parentname,pcontactnumber,
        studymode,staymode,travelmode,status,admiteddate);

  if(!courtest_title||!studentname||!regnumber||!gender||!dob||!department||
    !batch||!contactnumber||!email||!place||!address||!parentname||!pcontactnumber||
    !studymode||!staymode||!travelmode||!status||!admiteddate){
        return res.status(203).json({message:"All fields are required", token: req.newToken});    
  };

//-----------------
//To find the next student Id
async function findGreatestStuId() {
              try {
                  const result = await StudentModel.aggregate([
                      { $group: { _id: null, maxstudentid: { $max: "$studentid" } } }
                  ]);
                  return result.length > 0 ? Number(result[0].maxstudentid) + 1 : 90100;
              } catch (error) {
                  
                  console.error("Error finding greatest staffId:", error);
                  throw error;
              }
          };

//To save the Student details
try{
    const regnumbercheck=await StudentModel.find({regnumber:regnumber});
    if(regnumbercheck.length>0){
        console.log("Regnumber on db:",regnumbercheck);
        return res.status(203).json({message:"Register Number Already Exist!", token: req.newToken})
    }
    const stuID=await findGreatestStuId();

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
        studymode,
        staymode,
        travelmode,
        status,
        admiteddate

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

    try {
        const { studentid, ...updateData } = req.body;

        if (!studentid) {
            return res.status(400).json({ message: "StudentId is required for update", token: req.newToken });
        }

        console.log("Student ID:", studentid);
        console.log("Student details:", updateData);

        
        const updatedStudent = await StudentModel.updateOne({ studentid }, { $set: updateData });
        const updatedUser = await UserModel.updateOne(
            { username: studentid },
            { $set: { name: updateData.studentname, email: updateData.email } }
        );

        if (updatedStudent.modifiedCount > 0 || updatedUser.modifiedCount > 0) {
            return res.status(200).json({ message: "Student updated successfully", token: req.newToken, success: true });
        } else {
            return res.status(203).json({ message: "Student not found or no changes detected", token: req.newToken });
        }
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message, token: req.newToken });
    }
});

router.delete("/studentdelete", Verifytoken, async (req, res) => {
    if (req.userdata.role === "admin") {
        try {
            const {studentid}  = req.body;
            console.log("The student id for delete:",studentid);
            if (!studentid) {
                return res.status(203).json({ message: "Staff ID is required", token: req.newToken });
            }

            const deletedstudent = await StudentModel.deleteOne({ studentid });
            const deletedUser = await UserModel.deleteOne({ username: studentid });

            if (deletedstudent.deletedCount > 0 && deletedUser.deletedCount > 0) {
                return res.status(200).json({ message: "Student deleted successfully", token: req.newToken, success: true });
            } else {
                return res.status(203).json({ message: "Student not found", token: req.newToken });
            }
        } catch (error) {
            console.error("Error deleting Student:", error.message);
           return res.status(500).json({ message: "Unable to delete Student", token: req.newToken });
        }
    }
});


module.exports = router;