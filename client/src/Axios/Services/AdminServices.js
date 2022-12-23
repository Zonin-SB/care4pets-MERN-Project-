import { axiosAdminInstance } from '../Axios';

export const adminLogin = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post('/adminLogin', values, config);

  if (data) {
    return data;
  }
};

export const getUserDetails = async (token) => {
  // console.log(token,'axios token for admin');
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/userDetails', config);
  // console.log('data in admin axios',data);
  if (data.status) {
    return data;
  }
};

export const blockUser=async(token,id)=>{
    const config = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      const {data}=await axiosAdminInstance.get(`/blockUser/${id}`,config)
    //   console.log(data);
    if(data.status){
        return data;
    }
}

export const unblockUser=async(token,id)=>{
    const config = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      const {data}=await axiosAdminInstance.get(`/unblockUser/${id}`,config)
      console.log(data);
      if(data.status){
        return data;
      }
}
