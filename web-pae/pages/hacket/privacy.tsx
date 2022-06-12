/* eslint-disable react/function-component-definition */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonTemplate from '../components/button-template';
//import styles from '../css/pae.module.css';

const Developers = () => {
  const router = useRouter();

  const registerHandle = () => {
    router.push('/register');
  };

  const loginHandle = () => {
    router.push('../student/login');
  };

  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Privacy </h1>
    </div>
  );
};

export default Developers;
