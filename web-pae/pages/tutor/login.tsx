import type { NextPage } from 'next';
import React from 'react';
import LoginForm from '../../components/login-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login: NextPage = () => (
  <LoginForm
    url="http://server-pae.azurewebsites.net/logintutor/"
    image="/images/tutor-login-image.jpg"
    homeRoute="/tutor/home"
    user="tutor"
    forgotPasswordRoute="/tutor/forgot-password"
  />
);

export async function getStaticProps({ locale }) { 
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tutor-login']))
    }
  };
}

export default Login;
