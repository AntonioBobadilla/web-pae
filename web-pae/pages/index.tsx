/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import ToggleButton from '../components/toggle-button';
import ButtonTemplate from '../components/button-template';
import StepsRegister from '../components/steps-register';
import TextInput from '../components/text-input';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>WEB PAE</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <ToggleButton />

      <h1>
        Welcome to <a href="#">PAE</a>
      </h1>
      <div>
      </div>
    </main>
  </div>
);

export default Home;
