//=====================Importing Module and Packages=====================//
const internModel = require("../Model/internModel")
const collegeModel = require("../Model/collegeModel")
const { valid, regForName, regForFullName, regForLink, regForEmail } = require("../Validation/validation")


const createIntern = async function (req, res) {

    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data

        if (!(name && email && mobile && collegeName)) { return res.status(400).send({ status: false, msg: "All Fields are Mandatory." }) }

        if (!(valid(name))) return res.status(400).send({ status: false, msg: "Provide a valid Name." })
        if (!regForName(name)) return res.status(400).send({ status: false, msg: "Invalid Name." })

        if (!(valid(email))) return res.status(400).send({ status: false, msg: "Provide a valid Email." })
        if (!regForEmail(email)) return res.status(400).send({ status: false, msg: "Invalid Email." })
        let checkDuplicate = await internModel.findOne({ email: email })
        if (checkDuplicate) { return res.status(400).send({ status: false, msg: "Email Already Exist." }) }


        if (!(valid(mobile))) return res.status(400).send({ status: false, msg: "Provide a valid Mobile Number." })
        if (!(/^([+]\d{2})?\d{10}$/).test(mobile)) return res.status(400).send({ status: false, msg: "Invalid Mobile Number." })
        let checkNoDuplicate = await internModel.findOne({ mobile: mobile })
        if (checkNoDuplicate) { return res.status(400).send({ status: false, msg: "Mobile Number Already Exist." }) }


        data.collegeName = collegeName.toLowerCase()
        if (!(valid(collegeName))) return res.status(400).send({ status: false, msg: "Provide a valid College Name." })
        if (!regForName(collegeName)) return res.status(400).send({ status: false, msg: "Invalid College Name." })


        let getCollegeId = await collegeModel.findOne({ name: data.collegeName })
        if (!getCollegeId) { return res.status(400).send({ status: false, msg: "Your Data is not Exist." }) }

        data.collegeId = getCollegeId["_id"]

        let internData = await internModel.create(data)

        res.status(201).send({ status: true, msg: "Intern Data Created", Data: internData })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }

}

//=====================Module Export=====================//
module.exports = createIntern