import CardTutors from '@/components/card-tutors';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/tutor/asigned-tutorings.module.css';

const AssignedTutorings = () => (
  <div className={Styles.main}>
    <CardTutors />
  </div>
);

// Add sidebar layout
AssignedTutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Asesorías asignadas">{page}</SidebarLayout>;
};

export default AssignedTutorings;
