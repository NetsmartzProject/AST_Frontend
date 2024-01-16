
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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



