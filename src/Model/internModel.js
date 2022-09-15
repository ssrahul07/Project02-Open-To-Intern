//=====================Importing Module and Packages=====================//
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


//=====================Creating Intern Schema=====================//
const internModel = new mongoose.Schema(
    {
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, unique: true, trim: true, lowercase: true },
        mobile: { type: String, require: true, unique: true },
        collegeId: { type: ObjectId, ref: 'CollegeData' },
        isDeleted: { type: Boolean, default: false }

    }, { timestamps: true })


//=====================Module Export=====================//
module.exports = mongoose.model('InternData', internModel)