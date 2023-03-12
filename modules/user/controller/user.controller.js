const userModel = require("../../../DB/user.model") 
const sendEmail = require("../../../common/email")
const jwt = require('jsonwebtoken');


const {
	StatusCodes,
	getReasonPhrase,
} = require('http-status-codes');

const signUp = async(req,res)=>{
   try {
      let {email,password} = req.body
      let emailFound = await userModel.findOne({email})
      if (emailFound) {
         res.status(StatusCodes.BAD_REQUEST).json({massage:"email is aready found",statusErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
      }else{
             let addUser = new userModel({email,password})
             let saveUser = await addUser.save()
             let token = jwt.sign({id:addUser._id},process.env.JWTKEY,{expiresIn:"2 days"})
             const massage = `<a href='${req.protocol}://${req.headers.host}/user/confirmEmail/${token}'>hello</a>`
             sendEmail(email,massage)
             res.status(StatusCodes.ACCEPTED).json({massage:"succes add",saveUser}) 
      }
   } catch (error) {
      res.status(StatusCodes.BAD_GATEWAY).json({massage:"the serverr error",statusErr:getReasonPhrase(StatusCodes.BAD_GATEWAY)})

   }
}
const confirmPassword = async (req,res)=>{
try {
   let {token} = req.params
   const isconfirm = true 
   let {id} = jwt.verify(token, process.env.JWTKEY);
   const findUser = await userModel.findOne({_id:id},{})
   if (findUser) {
      if (findUser.confirmed) {
         res.status(StatusCodes.BAD_REQUEST).json({massage:"email was confirmed before "})

      }else{
         let updateUser = await userModel.findOneAndUpdate({_id:id},{confirmed:isconfirm})
         res.status(StatusCodes.ACCEPTED).json({massage:"email is confirmed",updateUser})
      }
   }else{
      res.status(StatusCodes.BAD_REQUEST).json({massage:"the email is not exist"})

   }

} catch (error) {
   res.status(StatusCodes.BAD_GATEWAY).json({massage:"the serverr error",error,statusErr:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
}


}
module.exports = {signUp,confirmPassword}