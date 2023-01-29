import { axiosExpertInstance } from '../Axios';

export const expertSignup = async (values) => {
  values.verified = false;
  values.blocked = false;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosExpertInstance.post(
    '/expertSignup',
    values,
    config
  );

  if (data.status) {
    return data;
  }
};

export const expertLogin = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.post(
    '/expertLogin',
    values,
    config
  );

  if (data) {
    return data;
  }
};

export const uploadDocuments = async (values) => {
  const { data } = await axiosExpertInstance.post('/uploadDocuments', {
    data: values,
    headers: { 'Content-type': 'application.json' },
  });

  if (data.status) {
    return data;
  }
};

export const expertApplyVerification = async (token, values) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.post(
    '/expertApplyVerification',
    values,
    config
  );

  if (data.status) {
    return data;
  }
};

export const getExpertDetails = async (token, id) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.get(
    `/getExpertDetails/${id}`,
    config
  );

  if (data.status) {
    return data;
  }
};

export const expertRejectionAccepted = async (token, id) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.get(
    `/expertRejectionAccepted/${id}`,
    config
  );

  if (data.status) {
    return data;
  }
};

export const expertAccepted = async (token, id) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.get(
    `/expertAccepted/${id}`,
    config
  );

  if (data.status) {
    return data;
  }
};

export const expertVideoUpload = async (token, values) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosExpertInstance.post(
    '/expertVideoUpload',
    values,
    config
  );

  if (data.status) {
    return data;
  }
};

export const getAllVideos = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getAllVideos/${id}`,
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
    const { data } = await axiosExpertInstance.get(
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

export const expertEditVideo = async (token, values) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.post(
      '/editVideo',
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

export const deleteVideo = async (token, values) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.post(
      '/deleteVideo',
      values,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {}
};

export const getRejectedVideoCount = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getRejectedVideoCount/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRejectedVideos = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getRejectedVideos/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRejectedVideoDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getRejectedVideoDetails/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const expertVideoRejected = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/expertVideoRejected/${id}`,
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
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
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

export const getAllClients = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getAllClients/${id}`,
      config
    );
    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClientDetails = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosExpertInstance.get(
      `/getClientDetails/${id}`,
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
    const { data } = await axiosExpertInstance.post(
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

    const { data } = await axiosExpertInstance.get(
      `/getAllMessages/${id}`,

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
