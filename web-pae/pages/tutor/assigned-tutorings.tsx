import CardTutors from '@/components/frontend-cardTutors';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const AssignedTutorings: NextPage = () =>{
  return (
    <CardTutors />
  )
};

// Add sidebar layout
AssignedTutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Asesorías asignadas">{page}</SidebarLayout>;
};

export default AssignedTutorings;
