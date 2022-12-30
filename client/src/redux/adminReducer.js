import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  userDetails: '',
  expertDetails: '',
  adminDetails: '',
};

const loginSlice = createSlice({
  name: 'logindetails',
  initialState: INITIAL_STATE,
  reducers: {
    userLoginDetails: (state, action) => {
      let { userDetails } = state;
      userDetails = action.payload;
      return { ...state, userDetails };
    },
    expertLoginDetails: (state, action) => {
      let { expertDetails } = state;
      expertDetails = action.payload;
      return { ...state, expertDetails };
    },
    adminLoginDetails: (state, action) => {
      let { adminDetails } = state;
      adminDetails = action.payload;
      return { ...state, adminDetails };
    },
    clearUserLoginDetails: (state, action) => {
      let { userDetails } = state;
      userDetails = false;
      return { ...state, userDetails };
    },
    clearExpertLoginDetails: (state, action) => {
      let { expertDetails } = state;
      expertDetails = false;
      return { ...state, expertDetails };
    },
    clearAdminLoginDetails: (state, action) => {
      let { adminDetails } = state;
      adminDetails = false;
      return { ...state, adminDetails };
    },
  },
});

// this is for dispatch
export const {
  userLoginDetails,
  expertLoginDetails,
  adminLoginDetails,
  clearUserLoginDetails,
  clearExpertLoginDetails,
  clearAdminLoginDetails,
} = loginSlice.actions;

// this is for configureStore
export default loginSlice.reducer;
