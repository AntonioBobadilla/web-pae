import React, { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/home.module.css';

const Home = () => (
  <div className={styles.cards}>
    <div className={styles.card}>
      <ImageCard
        image="/images/tutors.jpg"
        description="Asesores PAE"
        path="/admin/tutors"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/tutor-login-image.jpg"
        description="Solicitudes de asesoría"
        path="/admin/tutorings"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/tutor-login-image.jpg"
        description="Administrar unidades de formación"
        path="/admin/tutorings"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/tutor-login-image.jpg"
        description="Historial de asesorías"
        path="/admin/tutorings"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/tutor-login-image.jpg"
        description="Encuestas"
        path="/admin/tutorings"
      />
    </div>
  </div>
);

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="INICIO">{page}</SidebarLayout>;
};

export default Home;
