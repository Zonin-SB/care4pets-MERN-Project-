const jwt = require('jsonwebtoken');
const adminUtilities = require('../utilities/adminUtilities');
const userUtilities=require('../utilities/userUtilities')

const adminAuth=async (req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token=req.headers.authorization.split(' ')[1]
          
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
          
            req.user=await adminUtilities.findAdminById(decoded.adminId)
            next()
        } catch (error) {
            res.status(401);
            console.log(error);
             throw new Error('Not authorized, token fail');
        }
    }
    if (!token) {
        res.status(401);
        
        throw new Error('Not Authorized');
      }
   
}

const userAuth=async (req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token=req.headers.authorization.split(' ')[1]
          
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        //   console.log(decoded,'token dec');
            req.user=await userUtilities.findUserById(decoded.userId)
            next()
        } catch (error) {
            res.status(401);
            console.log(error);
             throw new Error('Not authorized, token fail');
        }
    }
    if (!token) {
        res.status(401);
        
        throw new Error('Not Authorized');
      }
   
}


module.exports={
    adminAuth,
    userAuth
}