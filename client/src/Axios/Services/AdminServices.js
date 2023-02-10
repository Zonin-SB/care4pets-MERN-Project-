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
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/userDetails', config);

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

export const getAllVideos = async (token) => {
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
  } catch (error) {}
};

export const deleteVideo = async (token, id) => {
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
};

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

export const getEditVideoDetails = async (token, id) => {
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
};

export const adminEditVideo = async (token, values) => {
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
};

export const adminRejectVideo = async (token, values) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentDetails = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get('/getPaymentDetails', config);
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentAllDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getPaymentAllDetails/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFeedback = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get('/getFeedback', config);
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const approveFeedback = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/approveFeedback/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const disapproveFeedback = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/disapproveFeedback/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbackDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getFeedbackDetails/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFeedback = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/deleteFeedback/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExpertDetailedView = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getExpertDetailedView/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExpertChangeRequestCount = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      '/getExpertChangeRequestCount',
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRequestList = async (token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get('/getRequestList', config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChangeRequestDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getChangeRequestDetails/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNewExpertDetails=async(token,id)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.get(
      `/getNewExpertDetails/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const adminRejectExpertChange=async(token,id,values)=>{
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosAdminInstance.post(
      `/adminRejectExpertChange/${id}`,
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

export const adminApproveExpertChange=async (token,id,values)=>{
try {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post(
    `/adminApproveExpertChange/${id}`,
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
