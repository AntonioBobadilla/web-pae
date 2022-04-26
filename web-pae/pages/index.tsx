/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import DataTable from '../components/data-table/data-table';
import { MeetingsMockService } from '../helpers/mock-service';

const Home: NextPage = () => {
  const [meetings, setMeetings] = React.useState(MeetingsMockService());

  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DataTable meetings={meetings} />
      <main>
        <h1>
          Welcome to <a href="#">PAE</a>
          Data
        </h1>
      </main>
    </div>
  );
};

export default Home;
