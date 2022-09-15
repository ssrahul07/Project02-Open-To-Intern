//=====================Importing Packages=====================//
const mongoose = require('mongoose')


//=====================Creating College Data Schema=====================//
const collegeModel = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true, trim: true },
        fullName: { type: String, require: true, trim: true },
        logoLink: { type: String, require: true, trim: true },
        isDeleted: { type: Boolean, default: false }

    }, { timestamps: true })


//=====================Module Export=====================//
module.exports = mongoose.model('CollegeData', collegeModel)