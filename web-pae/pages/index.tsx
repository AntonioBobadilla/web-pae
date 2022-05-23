/* eslint-disable react/function-component-definition */
import SidebarLayout from '@/components/layouts/sidebar-layout';
import TutoringQuestion from '@/components/tutoring-question';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';
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
      <TutoringQuestion></TutoringQuestion>
    </main>
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default Home;
// <ConfirmPopup url="http://www.google.com" />
