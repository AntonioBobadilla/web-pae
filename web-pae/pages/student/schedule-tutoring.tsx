import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const ScheduleTutoring: NextPage = () => <h1>Agendar asesoria</h1>;

// Add sidebar layout
ScheduleTutoring.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default ScheduleTutoring;
