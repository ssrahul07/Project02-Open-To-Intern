const collegeModel = require("../Model/collegeModel")

let createCollege = async function (req, res) {

    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (!(name && fullName && logoLink)) { return res.status(400).send({ status: false, msg: "All fields are Mandatory" }) }
        let checkDuplicate = await collegeModel.findOne({ name: name })
        if(checkDuplicate){return res.status(400).send({status: false, msg: "The College Name is already exist. Please provide another College Name."})}

        let college = await collegeModel.create(data)
        res.status(201).send({ status: true, msg: "College Data Created", Data: college })

    } catch (error) {

        return res.status(500).send({ error: error.message })
    }
}

module.exports = createCollege
