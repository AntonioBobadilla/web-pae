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
        image="/images/tutoring-request.jpg"
        description="Solicitudes de asesoría"
        path="/admin/tutorings-requests"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/back.jpeg"
        description="Historial de asesoría"
        path="/admin/history"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/adminUF.jpg"
        description="Administrar unidades de formación"
        path="/admin/subjects"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/survey.jpeg"
        description="Encuestas"
        path="/admin/polls"
      />
    </div>

    <div className={styles.card}>
      <ImageCard
        image="/images/administrators.jpg"
        description="Administradores PAE"
        path="/admin/admins"
      />
    </div>
  </div>
);

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="INICIO">{page}</SidebarLayout>;
};

export default Home;
