import type { NextPage } from 'next';
import React from 'react';
import LoginForm from '../../components/login-form';

const Login: NextPage = () => (
  <LoginForm
    url="http://server-pae.azurewebsites.net/logintutee/"
    image="/images/student-login-image.jpg"
    homeRoute="/student/home"
    user="tutee"
    forgotPasswordRoute="/student/forgot-password"
  />
);

export default Login;
