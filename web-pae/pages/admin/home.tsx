import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Home = () => {
  const { t } = useTranslation('admin-home');
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <ImageCard
          image="/images/tutors.jpg"
          description={t('PAE tutors')}
          path="/admin/tutors"
        />
      </div>

      <div className={styles.card}>
        <ImageCard
          image="/images/tutoring-request.jpg"
          description={t('Tutoring requests')}
          path="/admin/tutorings-requests"
        />
      </div>

      <div className={styles.card}>
        <ImageCard
          image="/images/back.jpeg"
          description={t('Tutoring records')}
          path="/admin/history"
        />
      </div>

      <div className={styles.card}>
        <ImageCard
          image="/images/adminUF.jpg"
          description={t('Manage subjects')}
          path="/admin/subjects"
        />
      </div>

      <div className={styles.card}>
        <ImageCard
          image="/images/survey.jpeg"
          description={t('Polls')}
          path="/admin/polls"
        />
      </div>

      <div className={styles.card}>
        <ImageCard
          image="/images/administrators.jpg"
          description={t('PAE administrators')}
          path="/admin/admins"
        />
      </div>
    </div>
  );
};

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('admin-home');
  return <SidebarLayout title={t('HOME')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {

  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin-home', 'tutor-profile']))
    }
  };
}
export default Home;
