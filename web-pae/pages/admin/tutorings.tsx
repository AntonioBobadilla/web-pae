import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const Tutorings: NextPage = () => <h1>Agendar asesoria</h1>;

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default Tutorings;
