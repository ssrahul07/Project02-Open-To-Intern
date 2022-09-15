//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const { createCollege, getCollegeData } = require("../Controller/collegeController")
const createIntern = require("../Controller/internController")



//=====================Create College Data(Post API)=====================//
router.post("/functionup/colleges", createCollege)

//=====================Create Intern Data(Post API)=====================//
router.post("/functionup/interns", createIntern)

//=====================Create Intern Data(Post API)=====================//
router.get("/functionup/collegeDetails", getCollegeData)




//=====================Module Export=====================//
module.exports = router;   