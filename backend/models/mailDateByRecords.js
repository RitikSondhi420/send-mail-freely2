const mongoose = require("mongoose");

const mailDateByRecordSchema = new mongoose.Schema({
    To: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "mailRecords",
        required: true
    }],
    sendedId:{
        type:String,
        unique:true
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const mailDateByRecords = mongoose.model('mailDateByRecords', mailDateByRecordSchema);
module.exports = mailDateByRecords;