const db = require("../models/index")
const sendMail = require("../middlewares/mailer");
const { validatePhone, validateEmail, emailRegex, phoneRegex } = require("../config/commonFunctions");

exports.sendMails = async (req,res,next) =>{
    try{
        const body = req.body;

        if(validateEmail(body.receiver)){
            await sendMail(body.sender, body.receiver, body.subject, body?.text, body.html)
        }else if(validatePhone(body.receiver)){
            // use twelio to send sms
        }


        const mailRecord = await db.mailRecords.create({
            To:body.receiver,
            description:body.html
        })

        const response = await db.mailDateByRecords.findOne({
            sendedId:body.sendedId
        })

        if(!response)
            await db.mailDateByRecords.create({
                To:[mailRecord._id],
                sendedId:body.sendedId
            })  
        else await db.mailDateByRecords.updateOne({_id:response._id},{ $set:{
                To:[...response.To,mailRecord._id]
            }
        })

        return res.status(200).send({message:'mail sent successfully',status:1})

    }catch(err){
        next(err)
    }
}

exports.checkSendedId = async (req,res,next) =>{
    try{
        const params = req.params;

        const response = await db.mailDateByRecords.findOne({
            sendedId:params.id
        })

        if(response){
            return res.status(400).send({message:'sendedId is not unique',status:0})
        }

        return res.status(200).send({message:'sendedId is unique',status:1})

    }catch(err){
        next(err)
    }
}

exports.fetchSendedMailRecords = async (req,res,next) =>{
    try{
        const params = req.params;
        if(params.type === 'mailRecords'){
            const mailRecords = await db.mailRecords.aggregate([
                {
                    $match:{
                        $expr:{
                            $regexMatch: {
                                input: "$To",
                                regex: emailRegex
                            }
                        }
                    }
                }
            ])
            return res.status(200).send({message:'sended mail records',data:mailRecords})
        }else if(params.type === 'phoneNumberRecords'){
            const phoneNumberRecords = await db.mailRecords.aggregate([
                {
                    $match:{
                        $expr:{
                            $regexMatch: {
                                input: "$To",
                                regex: phoneRegex
                            }
                        }
                    }
                }
            ])
            return res.status(200).send({message:'sended Phone Number records',data:phoneNumberRecords})
        }else if (params.type !== 'mailRecords' && params.type !== 'phoneNumberRecords'){
            return res.status(404).send({message:'wrong type for records'})
        }
    }catch(err){
        next(err)
    }
}