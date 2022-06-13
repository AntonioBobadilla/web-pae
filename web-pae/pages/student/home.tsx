import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';
import { useTranslation } from 'next-i18next';  // add this
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // add this



const Home = () => {

  const { t } = useTranslation('student-home'); // add this

 return (
  <div className={styles.cards}>
    <div className={styles.card}>
      <ImageCard
        image="/images/profile.jpg"
        description={t('Perfil')}
        path="/student/profile"
      />
    </div>
    <div className={styles.card}>
      <ImageCard
        image="/images/tutoring-request.jpg"
        description={t('Agendar asesoría')}
        path="/student/schedule-tutoring"
      />
    </div>
  </div>
)};


// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('student-home'); // add this
  return <SidebarLayout title={t('INICIO')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tutor-profile','student-home']))
    }
  };
}

export default Home;
