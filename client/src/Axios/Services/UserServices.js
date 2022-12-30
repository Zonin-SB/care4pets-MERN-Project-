import { axiosUserInstance } from "../Axios";

export const userSignup=async (values)=>{
    values.verified=false
    values.blocked=false
   
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const {data}=await axiosUserInstance.post('/userSignup',values,config)
    
    if(data.status){
        return data
    }
}

export const userLogin=async(values)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
 
    const {data}=await axiosUserInstance.post('/userLogin',values,config)
 
   if(data){
    return data
   }
}

export const getUserDetails = async (token, id) => {
   
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(`/getUserDetails/${id}`, config);
   console.log(data,'in u serv');
    if(data.status){
        return data;
    }
  };