
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminSlice';


export const store = configureStore({
  reducer: {
    admin: adminReducer,
    
  }
});