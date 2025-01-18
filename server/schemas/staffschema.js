const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    staffid: { type: String, required: true, unique: true },
    courtesy_title:{ type: String, required: true},
    staffname: { type: String, required: true },
    gender:{ type: String, required: true },
    dob:{type:String,required:true},
    designation: { type: String, required: true },
    department: { type: String, required: true },
    contact_no: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    email:{ type: String, required: true},
    place: { type: String, required: true },
    address:{type:String,require:true},
    special_designation:{type:String,require:true},
    role: { type: String, required: true },
    joined_date:{type:String,required:true},
}) ; 

module.exports= mongoose.model("staff", StaffSchema);