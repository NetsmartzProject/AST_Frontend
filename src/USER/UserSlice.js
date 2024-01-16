// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { checkUser, createUser } from './UserAPI';

// const initialState = {
//   loggedInUser: null,
//   status: 'idle',
//   error: null,
// };

// export const checkUserAsync = createAsyncThunk(
//   'user/checkUser',
//   async (loginInfo, { rejectWithValue }) => {
//     try {
//       const response = await checkUser(loginInfo);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Assuming your server returns detailed error messages
//     }
//   }
// );

// export const createUserAsync = createAsyncThunk(
//   'user/createUser',
//   async (userData) => {
//     const response = await createUser(userData);
//     return response.data;
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkUserAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(checkUserAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUser = action.meta.arg;
//       })
//       .addCase(checkUserAsync.rejected, (state, action) => {
//         console.error('Login error:', action.payload);
//         state.status = 'idle';
//         state.loggedInUser = null;
//         state.error = action.payload || 'An error occurred during login';
   
//       })
//       .addCase(createUserAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createUserAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUser = action.payload;
//       });
//   }, 
// });

// export default userSlice.reducer;

// UserSlice.js
import { createSlice } from '@reduxjs/toolkit';
import UserAPI from './UserAPI';
import { createTaskAsync } from './TaskAPI';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
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
