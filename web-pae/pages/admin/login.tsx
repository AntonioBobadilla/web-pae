import LoginForm from '@/components/login-form';
import { NextPage } from 'next';
import React from 'react';

const Login: NextPage = () => (
  <LoginForm
    url="http://server-pae.azurewebsites.net/logintutee/"
    image="/images/student-login-image.jpg"
    homeRoute="/student/home"
    user="admin"
    forgotPasswordRoute="/student/forgot-password"
  />
);

export default Login;
