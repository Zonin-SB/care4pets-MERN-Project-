import { axiosUserInstance } from '../Axios';

export const userSignup = async (values) => {
  values.verified = false;
  values.blocked = false;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.post('/userSignup', values, config);

  if (data.status) {
    return data;
  }
};

export const userLogin = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.post('/userLogin', values, config);

  if (data) {
    return data;
  }
};

export const getUserDetails = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.get(`/getUserDetails/${id}`, config);
  console.log(data, 'in u serv');
  if (data.status) {
    return data;
  }
};

export const updateUserProfile = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.post(
    '/updateUserProfile',
    values,
    config
  );
  if (data.status) {
    return data;
  }
};

// fetching datas for home page
export const viewAllPlan = async () => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.get('/viewAllPlan', config);
  if (data.status) {
    return data;
  }
};

export const uploadProfilePic = async (imageText) => {
  const { data } = await axiosUserInstance.post('/uploadUserProfilePic', {
    data: imageText,
    headers: { 'Content-type': 'application.json' },
  });

  if (data.status) {
    return data;
  }
};

export const userProfilePicUpdate = async (token, values) => {

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.post(
    '/userProfilePicUpdate',
    values,
    config
  );
  if (data.status) {
    return data;
  }
};

export const getUsersExpert=async (token,id)=>{
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const {data}=await axiosUserInstance.get(`/getUsersExpert/${id}`,config)
  
  if (data.status) {
    return data;
  }
}

// export const selectExpert=async(token,values)=>{
// console.log(values,'val in ax');
// const config = {
//   headers: {
//     Authorization: 'Bearer ' + token,
//     'Content-Type': 'application/json',
//   },
// };
// const {data}=await axiosUserInstance.post('/selectExpert',values,config)
  
//   if (data.status) {
//     return data;
//   }
// }
export const selectExpert=async(token,id)=>{
 
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const {data}=await axiosUserInstance.get(`/selectExpert/${id}`,config)
    
    if (data.status) {
      return data;
    }
  }

  export const selectPlan=async(token,id)=>{
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      const {data}=await axiosUserInstance.get(`/selectPlan/${id}`,config)
     
        if (data.status) {
          return data;
        }
    } catch (error) {
      console.log(error);
    }
    }

   export const buyPlan=async(token,values)=>{
    try {
    
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      const {data}=await axiosUserInstance.post('/create-checkout-session',values,config)
     
        if (data.status) {
          return data;
        }
    } catch (error) {
      console.log(error);
    }
    }

    export const postPlanOrderValues=async(token,values)=>{
      try {
     
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        };
        const {data}=await axiosUserInstance.post('/postPlanOrderValues',values,config)
        console.log(data,'order data');
        if (data.status) {
          return data;
        }
      } catch (error) {
        
      }
    }


