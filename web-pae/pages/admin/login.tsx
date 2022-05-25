import LoginForm from '@/components/login-form';
import { NextPage } from 'next';
import React from 'react';

const Login: NextPage = () => (
  <LoginForm
    url="http://server-pae.azurewebsites.net/loginadmin/"
    image="/images/student-login-image.jpg"
    homeRoute="/admin/home"
    user="admin"
    forgotPasswordRoute="/admin/forgot-password"
  />
);

export default Login;
