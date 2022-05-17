/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Calendar from '../components/frontend-calendar';
import SideBar from '../components/sidebar';
import SearchBar from '../components/frontend-searchBar';
import ImageCard from '../components/image-card';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>WEB PAE</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <SideBar
        dashboardFunction="#"
        profileFunction="/../student/login"
        tutoringFunction="/../student/login"
      />
    </main>
  </div>
);


export default Home;
// <ConfirmPopup url="http://www.google.com" />
