// // taskAPI.js
// import { createAsyncThunk } from '@reduxjs/toolkit';

// export const createTaskAsync = createAsyncThunk('tasks/createTask', async ({ email, taskData }) => {
//   try {
//     const response = await fetch(`http://localhost:3001/user/${email}/tasks`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(taskData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Task creation failed');
//     }

//     const responseData = await response.json();
//     return responseData.task;
//   } catch (error) {
//     throw error;
//   }
// });

