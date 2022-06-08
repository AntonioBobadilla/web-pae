import withAuthentication from '@/components/navigation/with-authentication';
import type { NextPage } from 'next';
import React from 'react';
import LoginForm from '../../components/login-form';

const Login: NextPage = () => (
  <LoginForm
    image="/images/tutor-login-image.jpg"
    homeRoute="/tutor/home"
    user="tutor"
    forgotPasswordRoute="/tutor/forgot-password"
  />
);

export default withAuthentication(Login);
