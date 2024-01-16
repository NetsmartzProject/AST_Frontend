
import { createSlice } from '@reduxjs/toolkit';
import UserAPI from './UserAPI';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle', 
    user: null,
    error: null,
    Task:[],
  },
  reducers: {
    
    setTasks: (state, action) => {
      state.Task = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(UserAPI.loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UserAPI.loginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(UserAPI.loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.error.message;
      });
   

  },
});
export const { setTasks } = userSlice.actions;

export default userSlice.reducer;
