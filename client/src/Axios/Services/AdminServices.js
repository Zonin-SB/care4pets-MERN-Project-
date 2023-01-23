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

export const blockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/blockUser/${id}`, config);
  //   console.log(data);
  if (data.status) {
    return data;
  }
};

export const unblockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/unblockUser/${id}`, config);
  console.log(data);
  if (data.status) {
    return data;
  }
};

export const getExpertDetails = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/expertDetails', config);

  if (data.status) {
    return data;
  }
};

export const blockExpert = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/blockExpert/${id}`, config);

  if (data.status) {
    return data;
  }
};

export const unblockExpert = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/unblockExpert/${id}`, config);
  // console.log(data);
  if (data.status) {
    return data;
  }
};

export const addPlan = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post('/addPlan', values, config);
  console.log(data, 'in admin serv');
  if (data.status) {
    return data;
  }
};

export const getAllPlan = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/getAllPlan', config);
  if (data.status) {
    return data;
  }
};

export const deletePlan = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/deletePlan/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const getPlanDetails = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/getPlanDetails/${id}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const editPlan = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post('/editPlan', values, config);
  if (data.status) {
    return data;
  }
};
export const getPendingApprovalCount = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(
    '/getPendingApprovalCount',
    config
  );

  if (data.status) {
    return data;
  }
};

export const getUsersCount = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/getUsersCount', config);

  if (data.status) {
    return data;
  }
};

export const getExpertsCount = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/getExpertsCount', config);

  if (data.status) {
    return data;
  }
};

export const getPendingApprovalDetails = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(
    '/getPendingApprovalDetails',
    config
  );

  if (data.status) {
    return data;
  }
};

export const getExpertAllDetails = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/getExpertAllDetails/${id}`,
    config
  );

  if (data.status) {
    return data;
  }
};

// export const approveExpert=async(token,id)=>{
//   const config = {
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//   };
// const {data}=await axiosAdminInstance.get(`/approveExpert/${id}`,config)

// if (data.status) {
//   return data;
// }
// }

export const rejectExpert = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post(
    '/rejectExpert',
    values,
    config
  );
  if (data.status) {
    return data;
  }
};

export const acceptExpert = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post(
    '/acceptExpert',
    values,
    config
  );
  if (data.status) {
    return data;
  }
};

export const getVideoApprovalList = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      '/getVideoApprovalList',
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVideoDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getVideoDetails/${id}`,
      config
    );
   
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const approveVideo = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/approveVideo/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideos=async(token)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get('/getAllVideos', config);

  if (data.status) {
    return data;
  }
  } catch (error) {
    
  }
}

export const deleteVideo=async(token,id)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(`/deleteVideo/${id}`, config);
  
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const getVideoApprovalCount = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      '/getVideoApprovalCount',
      config
    );
  
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }

};

export const getEditVideoDetails=async(token,id)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getEditVideoDetails/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const adminEditVideo=async(token,values)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.post(
      '/adminEditVideo',
      values,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const adminRejectVideo = async (token, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post(
    '/adminRejectVideo',
    values,
    config
  );
  if (data.status) {
    return data;
  }
};
