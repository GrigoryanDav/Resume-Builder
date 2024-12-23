import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  education: {},
  skills: {},
  miniProject: {},
  social: {},
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { formName, values } = action.payload;
      state[formName] = {...state[formName], ...values};
    },
    clearFormData: () => initialState
  }
});

export const { updateFormData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
