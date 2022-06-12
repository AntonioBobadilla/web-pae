import CardTutors from '@/components/card-tutors';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/tutor/asigned-tutorings.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'; 

const AssignedTutorings = () => (
  <div className={Styles.main}>
    <CardTutors />
  </div>
);

// Add sidebar layout
AssignedTutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Asesorías asignadas">{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }) { 
  return {
    props: {
      ...(await serverSideTranslations(locale, ['assigned-tutoring']))
    }
  };
}

export default AssignedTutorings;
