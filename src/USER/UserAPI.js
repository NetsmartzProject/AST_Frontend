  // import User from "./Dash/User";

  // export function checkUser(loginInfo) {
  //   const { email, password } = loginInfo;
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const response = await fetch('http://localhost:3001/user/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });

  //       if (!response.ok) {
  //         // If the response status is not OK (e.g., 4xx or 5xx), reject with an error message
  //         const errorData = await response.json();
  //         reject({ message: errorData.message || 'Login failed' });
  //         return;
  //       }

  //       const data = await response.json();
  //       if (data.user) {
  //         // Check if the 'user' property exists in the response
  //         console.log(data.user.email, 'user')
  //         if (password === data.user.password) {
  //           resolve({ data: data.password });
  //           <User/>
  //         } else {
  //           reject({ message: 'Wrong credentials' });
  //         }
  //       } else {
  //         reject({ message: 'User not found' });
  //       }
  //     } catch (error) {
  //       reject({ message: 'An error occurred during login' });
  //     }
  //   });
  // }

  // export function createUser(userData) {
  //   return new Promise( async (resolve) =>{
  //   const response = await fetch('http://localhost:3001/user/signup',{
  //     method:'POST',
  //     body:JSON.stringify(userData),
  //     headers:{'content-type':'application/json'}
  //   })
  //   const data = await response.json()
  //   // TODO :on server It will return only dome info of user (not password ) 
  //   resolve({data})
  // });
  // }


// userAPI.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define an async thunk to handle login
export const loginUserAsync = createAsyncThunk('user/login', async (credentials) => {
  try {
    const response = await fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials');
    }

    const userData = await response.json();
    return userData.user;
  } catch (error) {
    throw error;
  }
});

export default {
  loginUserAsync,
  // ...
};



