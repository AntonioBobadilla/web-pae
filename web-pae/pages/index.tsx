/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Poll from '../components/poll';
import styles from '../css/index.module.css';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>WEB PAE</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.component}>
      <Poll
        question={
          'Tu tutor es un pendejo? o si estaba preparado para resolver tus dudas aaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa'
        }
      ></Poll>
    </main>
  </div>
);

export default Home;
// <ConfirmPopup url="http://www.google.com" />
