import LoginFormAdmin from '@/components/login-form-admin';
import { NextPage } from 'next';
import React from 'react';

const Login: NextPage = () => (
  <LoginFormAdmin
    url="http://server-pae.azurewebsites.net/login/"
    image="/images/admin-login-image.jpg"
    homeRoute="/admin/home"
    user="admin"
    forgotPasswordRoute="/admin/forgot-password"
  />
);

export default Login;
