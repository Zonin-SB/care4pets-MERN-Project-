import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  userDetails: '',
  expertDetails: '',
  adminDetails: '',
  userAllDetails:'',
  userToken:'',
  planDetails:'',
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
    userAllDetails:(state,action)=>{
      let { userAllDetails } = state;
      userAllDetails=action.payload;
      return {...state,userAllDetails}
    },
    clearUserAllDetails: (state, action) => {
      let { userAllDetails } = state;
      userAllDetails = false;
      return { ...state, userAllDetails };
    },
    userToken:(state,action)=>{
      let {userToken}=state;
      userToken=action.payload
      return {...state,userToken}
    },
    clearUserToken:(state,action)=>{
      let{userToken}=state;
      userToken=false;
      return{...state,userToken}
    },
    planData:(state,action)=>{ 
    const  planDetails=action.payload
      return{...state,planDetails}
    }
    
    
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
  userAllDetails,
  clearUserAllDetails,
  userToken,
  clearUserToken,
  planData,
} = loginSlice.actions;

// this is for configureStore
export default loginSlice.reducer;
