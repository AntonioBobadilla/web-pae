import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; //translate the text

const Home: NextPage = () => (
  <div className={styles.cards}>
    <div className={styles.card}>
      <ImageCard image="/images/student-login-image.jpg" description="Perfil" />
    </div>
    <div className={styles.card}>
      <ImageCard
        image="/images/tutor-login-image.jpg"
        description="Asesorías asignadas"
      />
    </div>
  </div>
);

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Inicio">{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }) {
  //translate
  return {
    props: {
      ...(await serverSideTranslations(locale, ['student-forgot-password']))
    }
  };
}

export default Home;
