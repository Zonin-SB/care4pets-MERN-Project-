const collection=require('../config/collection')
const db=require('../config/connection')

module.exports={
    doAdminLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            const response = {};
            const admin= await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
            if(admin){
                if(adminData.password==admin.password){
                    response.admin=admin
                    response.status=true
                    resolve(response)
                }else{
                    resolve({status:false})
                }
            }else{
                resolve({status:false})
            }
            
        })
    }
}