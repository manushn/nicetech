const express=require('express');
const router=express.Router();
const StudentModel=require('../schemas/studentschema');
const {verifytoken}=require("../verifytoken");
const UserModel=require("../schemas/loginuserschema")

//Route to get student details
router.post('/getstudent',async(req , res)=>{
    console.log("from getstudent:",req.body);
    console.log("studentname:",req.body.studentname);
    console.log("studentid:",req.body.studentid);
    console.log("distincts",req.body.distinctes);
    console.log("sortdata",req.body.sortdata);

    if(req.body.distinctes){
        try{
            const studentdata=await StudentModel.distinct(req.body.distinctes);
           return res.status(200).json({studentdata,cardsuccess:true})
        }catch(error){
           return res.status(203).json({message:"Unable to fetch data"})
        }
    };

    //------------------------------

    try{
       const StudentData= await StudentModel.find(req.body.studentid||undefined);
       return res.status(200).json({StudentData});
    }catch(err){
        console.log("Error in getting Student details:",err)
        return res.status(203).json({message:"Error in geting Student Data"});
        
    };
});

//-------------------------------------------------------------------
//Route to Add Students
router.post('/addstudent',async(req,res)=>{
    
  const {courtest_title,studentname,gender,dob,department,
    batch,contactnumber,email, place,address,parentname,pcontactnumber,
    studymode,staymode,travelmode,status,admiteddate} =req.body;

    console.log(courtest_title,studentname,gender,dob,department,
        batch,contactnumber,email, place,address,parentname,pcontactnumber,
        studymode,staymode,travelmode,status,admiteddate);

  if(!courtest_title||!studentname||!gender||!dob||!department||
    !batch||!contactnumber||!email||!place||!address||!parentname||!pcontactnumber||
    !studymode||!staymode||!travelmode||!status||!admiteddate){
        return res.status(203).json({message:"All fields are required"});    
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
    const stuID=await findGreatestStuId();

    const newstudent= new StudentModel({
        studentid:stuID,
        courtest_title,
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
    res.status(200).json({message:"Student Added  Successfully!",success:true})
}catch(error){
    res.status(203).json({message:"Error in adding student details"})
    console.log('Error in adding student',error)
};


})

module.exports = router;