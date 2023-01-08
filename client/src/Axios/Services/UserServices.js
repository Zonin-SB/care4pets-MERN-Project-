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
  // console.log(data, 'in axios');
  if (data.status) {
    return data;
  }
};

export const userProfilePicUpdate = async (token, values) => {
  console.log(token, 'pro token');
  console.log(values, 'cloud values');
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
