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

export const sendverificationOTP = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.post('/userSendOTP', values, config);

  if (data) {
    return data;
  }
};

export const verifyOTP = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.post('/verifyOTP', values, config);

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

export const getUsersExpert = async (token, id) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.get(
    `/getUsersExpert/${id}`,

    config
  );

  if (data.status) {
    return data;
  }
};

export const selectExpert = async (token, id) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.get(`/selectExpert/${id}`, config);

  if (data.status) {
    return data;
  }
};

export const selectPlan = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(`/selectPlan/${id}`, config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const buyPlan = async (token, values) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.post(
      '/create-checkout-session',
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

export const postPlanOrderValues = async (token, values) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.post(
      '/postPlanOrderValues',
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

export const getFreeVideos = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getFreeVideos/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPlanVideos = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getPlanVideos/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVideosCount = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getVideosCount/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPlanDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getPlanDetails/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getYourExpertDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getYourExpertDetails/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (token, id, values) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const value = { message: values };
    const { data } = await axiosUserInstance.post(
      `/sendMessage/${id}`,
      value,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllMessages = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axiosUserInstance.get(
      `/getAllMessages/${id}`,

      config
    );
    // console.log(data)
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getExperts = async () => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const { data } = await axiosUserInstance.get('/getExperts', config);
  if (data.status) {
    return data;
  }
};

export const checkUserPlan = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axiosUserInstance.get(
      `/checkUserPlan/${id}`,

      config
    );
    console.log(data);
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserHomePlan=async(id)=>{
  try {
    const config = {
      headers: {
        
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.get(
      `/getUserHomePlan/${id}`,

      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const sendFeedback=async(token,values)=>{
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axiosUserInstance.post(
      '/sendFeedback',
values,
      config
    );
    console.log(data);
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
