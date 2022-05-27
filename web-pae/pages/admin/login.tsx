import LoginFormAdmin from '@/components/login-form-admin';
import withAuthentication from '@/components/navigation/with-authentication';
import { NextPage } from 'next';
import React from 'react';

const Login: NextPage = () => (
  <LoginFormAdmin
    image="/images/admin-login-image.jpg"
    homeRoute="/admin/home"
    user="admin"
    forgotPasswordRoute="/admin/forgot-password"
  />
);

export default withAuthentication(Login);
