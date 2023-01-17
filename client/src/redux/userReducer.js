import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  selectedExpertDetails: '',
  selectedPlanDetails: '',
  planOrderValues: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    getSelectedExpertDetails: (state, action) => {
      const selectedExpertDetails = action.payload;
      return { ...state, selectedExpertDetails };
    },
    getSelectedPlanDetails: (state, action) => {
      const selectedPlanDetails = action.payload;
      return { ...state, selectedPlanDetails };
    },
    getPlanOrderValues: (state, action) => {
      const planOrderValues = action.payload;
      return { ...state, planOrderValues };
    },
  },
});

export const {
  getSelectedExpertDetails,
  getSelectedPlanDetails,
  getPlanOrderValues,
} = userSlice.actions;
export default userSlice.reducer;
