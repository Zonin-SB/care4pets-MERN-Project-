const { response } = require('express')
const jwt=require('jsonwebtoken');
const userUtilities=require('../utilities/userUtilities')

const userSignup=(req,res)=>{
    const data=req.body
    delete data.confirmPassword
    userUtilities.doUserSignup(data).then((response)=>{
        console.log(response);
        if (response.emailFound) {
            res.json({ status: "error", error: "This email or phone number already exists,try another one." });
          } else {
            res.json({ status: "success" });
          }
    }).catch((err)=>{
        console.log(err);
    })
}

const userLogin=(req,res)=>{
    const data=req.body
    userUtilities.doUserLogin(data).then((response)=>{
        if(response.blocked){
            return res.json({blocked:true,user:false})
        }else{
            if(response.status){
                const token = jwt.sign(
                    {
                        userId:response.user._id,
                        name:response.user.name,
                        email:response.user.email
                    }, process.env.JWT_SECRET_KEY);
                    return res.json({ status: 'ok', user: token });
            }
            return res.json({ status: "error", user: false });
        }
       
    })
    
}


module.exports={
    userSignup,
    userLogin
}