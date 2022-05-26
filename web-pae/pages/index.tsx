/* eslint-disable react/function-component-definition */
import ButtonTemplate from '@/components/button-template';
import StudentPoll from '@/components/dialogs/student-poll';
import SidebarLayout from '@/components/layouts/sidebar-layout';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import styles from '../css/index.module.css';

const Home = () => {
  const [studentPoll, setStudentPollVisible] = React.useState(true);
  const onClickModifyPoll = () => {
    setStudentPollVisible(true);
  };
  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.component}>
        {studentPoll && (
          <StudentPoll
            visible={studentPoll}
            setVisible={setStudentPollVisible}
          />
        )}
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default Home;
// <ConfirmPopup url="http://www.google.com" />
