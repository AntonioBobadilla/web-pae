import type { NextPage } from 'next';
import React from 'react';
import LoginForm from '../../components/login-form';

const Login: NextPage = () => (
  <LoginForm
    url="http://server-pae.azurewebsites.net/login/"
    image="/images/tutor-login-image.jpg"
    homeRoute="/tutor/home"
    user="tutor"
    forgotPasswordRoute="/tutor/forgot-password"
  />
);

export default Login;
