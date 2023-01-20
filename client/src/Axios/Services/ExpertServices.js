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
  console.log(data, 'in axios');
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
  console.log(data, 'data in axios');
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
