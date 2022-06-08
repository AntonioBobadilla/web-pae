import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';

const Home: NextPage = () => (
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

export default Home;
