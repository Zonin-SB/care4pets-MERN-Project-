import { axiosAdminInstance } from "../Axios";

export const adminLogin=async(values)=>{
    const config={
        Headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axiosAdminInstance.post('/adminLogin',values,config)
  
    if(data){
     return data
    }
}