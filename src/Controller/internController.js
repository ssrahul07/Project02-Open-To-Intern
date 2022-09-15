//=====================Importing Module and Packages=====================//
const internModel = require("../Model/internModel")
const collegeModel = require("../Model/collegeModel")
const { valid, regForName, regForEmail, regForMobileNo } = require("../Validation/validation")



//===================== This function is used for Creating an Intern =====================//
const createIntern = async function (req, res) {

    try {
        let data = req.body

        //===================== Destructing Data =====================//
        let { name, email, mobile, collegeName } = data

        //===================== Checking the Mandatory Field =====================//
        if (!(name && email && mobile && collegeName)) { return res.status(400).send({ status: false, msg: "All Fields are Mandatory." }) }

        //=====================Validation of Name=====================//
        if (!(valid(name))) return res.status(400).send({ status: false, msg: "Provide a valid Name." })
        if (!regForName(name)) return res.status(400).send({ status: false, msg: "Invalid Name." })

        //===================== Validation of Email and Checking Duplicate Value =====================//
        if (!(valid(email))) return res.status(400).send({ status: false, msg: "Provide a valid Email." })
        if (!regForEmail(email)) return res.status(400).send({ status: false, msg: "Invalid Email." })
        let checkDuplicate = await internModel.findOne({ email: email })
        if (checkDuplicate) { return res.status(400).send({ status: false, msg: "Email Already Exist." }) }

        //===================== Validation of Mobile Number and Checking Duplicate Value =====================//
        if (!(valid(mobile))) return res.status(400).send({ status: false, msg: "Provide a valid Mobile Number." })
        if (!regForMobileNo(mobile)) return res.status(400).send({ status: false, msg: "Invalid Mobile Number." })
        let duplicateMobile = await internModel.findOne({ mobile: mobile })
        if (duplicateMobile) { return res.status(400).send({ status: false, msg: "Mobile Number Already Exist." }) }

        //===================== Validation of CollegeName =====================//
        data.collegeName = collegeName.toLowerCase()
        if (!(valid(collegeName))) return res.status(400).send({ status: false, msg: "Provide a valid College Name." })
        if (!regForName(collegeName)) return res.status(400).send({ status: false, msg: "Invalid College Name." })

        //===================== Fetching College Data from DB =====================//
        let getCollegeId = await collegeModel.findOne({ name: data.collegeName })
        if (!getCollegeId) { return res.status(400).send({ status: false, msg: "Your Data is not Exist." }) }

        //===================== Creating CollegeId inside Body with Key and Value =====================//
        data.collegeId = getCollegeId["_id"]

        //===================== Creating Intern Data in DB =====================//
        let internData = await internModel.create(data)

        res.status(201).send({ status: true, msg: "Intern Data Created Sucessfully.", Data: internData })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }

}




//=====================Module Export=====================//
module.exports = createIntern