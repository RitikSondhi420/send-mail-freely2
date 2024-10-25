const mongoose = require("mongoose");

const mailRecordSchema = new mongoose.Schema({
    To:{
        type:String,
        required:true,
        // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message : 'Please enter a valid email address'}]
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}
})

const mailRecords = mongoose.model('mailRecords',mailRecordSchema)
module.exports = mailRecords;