import type { NextPage } from 'next';
import React from 'react';
import LoginForm from '../../components/login-form';

const Login: NextPage = () => (
  <LoginForm
    image="/images/student-login-image.jpg"
    homeRoute="/student/home"
    user="student"
    forgotPasswordRoute="/student/forgot-password"
  />
);

export default Login;
