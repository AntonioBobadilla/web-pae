import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '@/css-components/tutoring-requests.module.css';
import TutoringRequests from '@/components/tutoring/front-component-tutoringRequests';


const Tutorings: NextPage = () => {
  return (
    <div className={styles.main}>
      <button className={styles.Mainbutton}>Asesorías solicitadas</button>
      <TutoringRequests />
    </div>
  )
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Solicitudes de asesorías">{page}</SidebarLayout>;
};

export default Tutorings;
