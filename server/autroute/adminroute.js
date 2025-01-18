const express = require("express");
const router = express.Router();
const StaffModel = require("../schemas/staffschema");
const UserModel=require("../schemas/loginuserschema");
const { Verifytoken } = require("../verifytoken");

// getStaff Details
router.post("/getstaff", Verifytoken, async (req, res) => {
    
    if(req.userdata.role==="admin"){
    try {
        // Fetch staff details based on query
        console.log("iddata:",req.body.iddata)
        const staffDetails = await StaffModel.find(req.body.iddata,req.body.sortdata);
        res.status(200).json({ staffDetails, token: req.newToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Unable to fetch staff details" });
    }
}
});

//----------------------------------------------------------------------------------------------------------------
// Route to add a new staff member
router.post("/staffadd", Verifytoken, async (req, res) => {
    if (req.userdata.role === "admin") {
        const { courtesy_title, staffname, gender, dob,designation, department, contactNumber, email, place, address, special_designation, role, joined_date } = req.body;

        if (!courtesy_title || !staffname || !gender ||!dob|| !designation || !department || !contactNumber || !email || !place || !address || !special_designation || !role || !joined_date) {
            return res.status(400).json({ message: "All fields are required", token: req.newToken });
        }

        async function findGreatestStaffId() {
            try {
                const result = await StaffModel.aggregate([
                    { $group: { _id: null, maxStaffId: { $max: "$staffid" } } }
                ]);
                return result.length > 0 ? Number(result[0].maxStaffId) + 1 : 100001;
            } catch (error) {
                console.error("Error finding greatest staffId:", error);
                throw error;
            }
        }

        try {
            const newStaffId = await findGreatestStaffId();
            s

            const newStaff = new StaffModel({
                staffid: newStaffId,
                courtesy_title,
                staffname,
                gender,
                dob,
                designation,
                department,
                contact_no: contactNumber,
                email,
                place,
                address,
                special_designation,
                role,
                joined_date
            });

            const newUser = new UserModel({
                username: newStaffId,
                password:dob,
                email,
                role,
                name: staffname,
            });

            await newStaff.save();
            await newUser.save();
            res.status(201).json({ message: "Staff and User created successfully", token: req.newToken, success: true });
        } catch (error) {
            console.error("In staff add try:", error.message);
            res.status(500).json({ message: error.message, token: req.newToken });
        }
    } else {
        res.status(403).json({ access: false });
    }
});

//----------------------------------------------------------------------------------------------------------------

// Route to update staff details
router.put("/staffupdate", Verifytoken, async (req, res) => {
    if (req.userdata.role === "admin") {
        try {
            const { staffid, ...updateData } = req.body;
            if (!staffid) {
                return res.status(400).json({ message: "Staff ID is required for update" });
            }
            console.log("from Staffupdate",updateData.staffname,updateData.role)
            const updatedStaff = await StaffModel.updateOne({ staffid }, { $set: updateData });
            const updatedUser = await UserModel.updateOne({ username: staffid }, { $set: { name: updateData.staffname, email:updateData.email,role: updateData.role } });

            if (updatedStaff.modifiedCount > 0 && updatedUser.modifiedCount > 0) {
                res.status(200).json({ message: "Staff updated successfully", token: req.newToken, success: true });
            } else {
                res.status(404).json({ message: "Staff not found or no changes detected", token: req.newToken });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to update staff details", token: req.newToken });
        }
    }
});

//----------------------------------------------------------------------------------------------------------------

// Route to delete a staff member
router.delete("/staffdelete", Verifytoken, async (req, res) => {
    if (req.userdata.role === "admin") {
        try {
            const { staffid } = req.body;
            if (!staffid) {
                return res.status(400).json({ message: "Staff ID is required", token: req.newToken });
            }

            const deletedStaff = await StaffModel.deleteOne({ staffid });
            const deletedUser = await UserModel.deleteOne({ username: staffid });

            if (deletedStaff.deletedCount > 0 && deletedUser.deletedCount > 0) {
                res.status(200).json({ message: "Staff deleted successfully", token: req.newToken, success: true });
            } else {
                res.status(404).json({ message: "Staff not found", token: req.newToken });
            }
        } catch (error) {
            console.error("Error deleting staff:", error.message);
            res.status(500).json({ message: "Unable to delete staff", token: req.newToken });
        }
    }
});

module.exports = router;