import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';

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
  return <SidebarLayout title="INICIO">{page}</SidebarLayout>;
};

export default Home;
