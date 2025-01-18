const mongoose=require("mongoose")

const StudentSchema =new mongoose.Schema({
    studentid:{type:String,required:true,unique:true},
    courtest_title:{type:String,required:true},
    studentname:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true},
    department:{type:String,required:true},
    batch:{type:Number,required:true},
    contactnumber:{type:String,required:true},
    email:{type:String,required:true},
    place:{type:String,required:true},
    address:{type:String,required:true},
    parentname:{type:String,required:true},
    pcontactnumber:{type:String,required:true},
    studymode:{type:String,required:true},
    staymode:{type:String,required:true},
    travelmode:{type:String,required:true},
    status:{type:String,required:true}
})

module.exports= mongoose.model("student", StudentSchema);