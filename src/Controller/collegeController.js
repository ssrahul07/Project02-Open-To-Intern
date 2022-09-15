//=====================Importing Module and Packages=====================//
const collegeModel = require("../Model/collegeModel")
const internModel = require("../Model/internModel")
const { valid, regForName, regForFullName, regForLink, regForExtension } = require("../Validation/validation")



//===================== This function is used for Creating a College Data =====================//
const createCollege = async function (req, res) {

    try {
        let data = req.body

        //===================== Destructing Data =====================//
        let { name, fullName, logoLink } = data

        //===================== Checking the Mandatory Field =====================//
        if (!(name && fullName && logoLink)) { return res.status(400).send({ status: false, msg: "All Fields are Mandatory." }) }

        //=====================Validation of Name=====================//
        if (!(valid(name))) return res.status(400).send({ status: false, msg: "Provide a valid Name" })
        if (!regForName(name)) return res.status(400).send({ status: false, msg: "Invalid Name" })

        //=====================Validation of Full Name=====================//
        if (!(valid(fullName))) return res.status(400).send({ status: false, msg: "Provide a valid fullName" })
        if (!regForFullName(fullName)) return res.status(400).send({ status: false, msg: "Invalid fullName" })

        //=====================Validation of Logo Link=====================//
        if (!(valid(logoLink))) return res.status(400).send({ status: false, msg: "Provide a valid logoLink" })
        if (!regForLink(logoLink)) return res.status(400).send({ status: false, msg: "Invalid Link" })
        if (!regForExtension(logoLink)) return res.status(400).send({ status: false, msg: "Invalid Extension Format." })

        //===================== Converting the value to LowerCase =====================//
        data.name = name.toLowerCase()

        //===================== Checking the Duplicate Value for Unique =====================//
        let checkDuplicate = await collegeModel.findOne({ name: data.name })
        if (checkDuplicate) { return res.status(400).send({ status: false, msg: "The College Name is already exist. Please provide another College Name." }) }

        //===================== Creating College Data in DB =====================//
        let collegeData = await collegeModel.create(data)
        res.status(201).send({ status: true, msg: "College Data Created Sucessfully.", Data: collegeData })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }
}


//===================== This function is used for Get College Data =====================//
const getCollegeData = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        //===================== Checking the Mandatory Field =====================//
        if (Object.keys(req.query).length == 0) { return res.status(400).send({ status: false, msg: "CollegeName is Mandatory" }) }
        if (!collegeName) { return res.status(400).send({ status: false, msg: "Please Enter your CollegeName" }) }

        //===================== Fetching College Data from DB =====================//
        let getCollegeName = await collegeModel.findOne({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1 })
        if (!getCollegeName) { return res.status(404).send({ status: false, msg: `${collegeName} not Found.` }) }

        //===================== Fetching Intern Data from DB =====================//
        let getinternName = await internModel.find({ collegeId: getCollegeName["_id"] }).select({ name: 1, email: 1, mobile: 1 })

        //===================== Creating an Object for Output =====================//
        let obj = {}
        obj.name = getCollegeName.name
        obj.fullName = getCollegeName.fullName
        obj.logoLink = getCollegeName.logoLink

        //===================== Checking Intern Data is present or not =====================//
        if (getinternName.length == 0) { return res.status(404).send({ data: obj, intern: `Intern is not available at this ${collegeName}.` }) }

        //===================== Creating a key inside Object and put the value =====================//
        obj.intern = getinternName

        res.status(200).send({ status: true, data: obj })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }

}


//=====================Module Export=====================//
module.exports = { createCollege, getCollegeData }
