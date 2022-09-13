const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.type.ObjectId

const internModel = new mongoose.Schema(
    {
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, unique: true, trim: true },
        mobile: { type: Number, require: true, unique: true },
        collegeId: { type: ObjectId, ref: 'CollegeData' },
        isDeleted: { type: Boolean, default: false}

    }, { timestamps: true })

module.exports = mongoose.model('InternData', internModel)