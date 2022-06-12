import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; //translate the text

const Home = () => (
  <div className={styles.cards}>
    <div className={styles.card}>
      <ImageCard
        image="/images/profileTutor.jpg"
        description="Perfil"
        path="/tutor/profile"
      />
    </div>
    <div className={styles.card}>
      <ImageCard
        image="/images/history.jpeg"
        description="Asesorías asignadas"
        path="/tutor/assigned-tutorings"
      />
    </div>
  </div>
);

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Inicio">{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['student-home']))
    }
  };
}

export default Home;
