// src/SignupForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Signup successful!');
        navigate('/')
      } else {
        console.error('Signup failed:', response.status);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <Field type="text" id="firstname" name="firstname" />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <Field type="text" id="lastname" name="lastname" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
          </div>
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
