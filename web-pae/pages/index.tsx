/* eslint-disable react/function-component-definition */
import SubjectForm from '@/components/subject-form';
import Head from 'next/head';
import React from 'react';
import styles from '../css/index.module.css';

const Home = () => (
  <div>
    <Head>
      <title>WEB PAE</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.component}>
      <SubjectForm />
    </main>
  </div>
);

export default Home;
// <ConfirmPopup url="http://www.google.com" />
