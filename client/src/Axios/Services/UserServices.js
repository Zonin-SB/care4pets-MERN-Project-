import { axiosUserInstance } from "../Axios";

export const userSignup=async (values)=>{
    values.verified=false
    values.blocked=false
   
    const config={
        Headers:{
            'Content-Type':'application/json'
        }
    }

    const {data}=await axiosUserInstance.post('/userSignup',values,config)
    console.log(data);
    if(data.status){
        return data
    }
}

export const userLogin=async(values)=>{
    const config={
        Headers:{
            'Content-Type':'application/json'
        }
    }
 
    const {data}=await axiosUserInstance.post('/userLogin',values,config)
  
   if(data){
    return data
   }
}