// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link as MuiLink, Paper, Box, Grid, Typography, ThemeProvider } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import { createUserAsync } from './UserSlice';

// const defaultTheme = createTheme();

// const SignUpForm = ({ handleSignUp }) => {
//   const dispatch = useDispatch();

//   const [state, setState] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (evt) => {
//     const value = evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value,
//     });
//   };

//   const handleOnSubmit = (evt) => {
//     evt.preventDefault();

//     // Add validation logic here (e.g., checking if passwords match)
//     if (state.password !== state.confirmPassword) {
//       console.error("Passwords do not match!");
//       return;
//     }

//     handleSignUp(state);

//     setState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     });
//   };

//   const navigate=useNavigate()
//   const handleSubmit = (data) => {
//     // Implement your signup logic here
//     console.log("Signing up with:", data);
//     dispatch(createUserAsync({
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       password: data.password,
//       role: 'user',
//     }));

//     navigate('/dashboard');


//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleOnSubmit}
//       sx={{
//         my: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         Sign up
//       </Typography>
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="firstName"
//         label="First Name"
//         name="firstName"
//         autoComplete="fname"
//         autoFocus
//         value={state.firstName}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="lastName"
//         label="Last Name"
//         name="lastName"
//         autoComplete="lname"
//         value={state.lastName}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="email"
//         label="Email Address"
//         name="email"
//         autoComplete="email"
//         value={state.email}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         name="password"
//         label="Password"
//         type="password"
//         id="password"
//         autoComplete="new-password"
//         value={state.password}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         name="confirmPassword"
//         label="Confirm Password"
//         type="password"
//         id="confirmPassword"
//         autoComplete="new-password"
//         value={state.confirmPassword}
//         onChange={handleChange}
//       />
//       <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleSubmit(state)}>
//         Sign Up
//       </Button>
//     </Box>
//   );
// };

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const handleSignUp = (data) => {
//     // Implement your signup logic here
//     console.log("Signing up with:", data);
//     // dispatch(createUserAsync({
//     //   firstName: data.firstName,
//     //   lastName: data.lastName,
//     //   email: data.email,
//     //   task: [],
//     //   password: data.password,
//     //   role: 'user',
//     // }));
//     // You may want to dispatch an action to handle signup asynchronously
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         {/* Include your background image for signup if needed */}
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               my: 8,
//               mx: 4,
//             }}
//           >
//             <SignUpForm handleSignUp={handleSignUp} />
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default SignUp;
