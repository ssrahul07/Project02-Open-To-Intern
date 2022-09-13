//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const createCollege = require("../Controller/collegeController")





//=====================Create Authors(Post API)=====================//
router.post("/functionup/colleges", createCollege)





//=====================Module Export=====================//
module.exports = router;   