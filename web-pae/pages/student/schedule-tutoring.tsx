import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import TutoringQuestion from '../../components/tutoring-question';

const ScheduleTutoring: NextPage = () => <TutoringQuestion></TutoringQuestion>;

// Add sidebar layout
ScheduleTutoring.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default ScheduleTutoring;
