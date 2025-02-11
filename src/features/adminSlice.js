// src/features/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    username: '',
    role: '',
  },
  reducers: {
    setAdminDetails: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    clearAdminDetails: (state) => {
      state.username = '';
      state.role = '';
    },
  },
});

export const { setAdminDetails, clearAdminDetails } = adminSlice.actions;
export default adminSlice.reducer;
