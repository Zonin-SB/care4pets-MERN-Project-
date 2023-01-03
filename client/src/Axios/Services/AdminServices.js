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
