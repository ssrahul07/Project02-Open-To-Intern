//=====================Importing Module and Packages=====================//
const collegeModel = require("../Model/collegeModel")
const internModel = require("../Model/internModel")
const { valid, regForName, regForFullName, regForLink }= require("../Validation/validation")


const createCollege = async function (req, res) {

    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (!(name && fullName && logoLink)) { return res.status(400).send({ status: false, msg: "All Fields are Mandatory." }) }

        if (!(valid(name))) return res.status(400).send({ status: false, msg: "Provide a valid Name" })
        if (!regForName(name)) return res.status(400).send({ status: false, msg: "Invalid Name" })

        if (!(valid(fullName))) return res.status(400).send({ status: false, msg: "Provide a valid fullName" })
        if (!(/   /g).test(fullName)) return res.status(400).send({ status: false, msg: "Invalid fullName" })

        if (!(valid(logoLink))) return res.status(400).send({ status: false, msg: "Provide a valid logoLink" })
        if (!regForLink(logoLink)) return res.status(400).send({ status: false, msg: "Invalid Link" })

        data.name = name.toLowerCase()
        let checkDuplicate = await collegeModel.findOne({ name: data.name })
        if (checkDuplicate) { return res.status(400).send({ status: false, msg: "The College Name is already exist. Please provide another College Name." }) }

        let collegeData = await collegeModel.create(data)
        res.status(201).send({ status: true, msg: "College Data Created", Data: collegeData })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }
}



const getCollegeData = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) { return res.status(400).send({ status: false, msg: "College Name is Mandatory" }) }


        let getCollegeName = await collegeModel.findOne({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1 })
        if (!getCollegeName) { return res.status(404).send({ status: false, msg: `${collegeName} not Found.` }) }

        let getinternName = await internModel.find({ collegeId: getCollegeName["_id"] }).select({ name: 1, email: 1, mobile: 1 })

        let obj = {}
        obj.name = getCollegeName.name
        obj.fullName = getCollegeName.fullName
        obj.logoLink = getCollegeName.logoLink
        

        if (getinternName.length == 0) { return res.status(404).send({ data: obj, intern: `Intern is not at this ${collegeName}.` }) }
        obj.intern = getinternName

        res.status(200).send({ status: true, data: obj })

    } catch (error) {
        return res.status(500).send({ error: error.message })

    }

}


//=====================Module Export=====================//
module.exports = { createCollege, getCollegeData }
