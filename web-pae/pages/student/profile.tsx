import ToggleMenuStudent from '@/components/toggle-menu-student';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import CardInformationStu from '../../components/card-information-student';
import Styles from '../../css/student/profile.module.css';

const Profile: NextPage = () => (
  <div className={Styles.content}>
    <ToggleMenuStudent />
    <h1>Profile</h1>
    <div className={Styles.cardInfo}>
      <CardInformationStu />
      <CardInformationStu />
      <CardInformationStu />
    </div>
  </div>
);

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};

export default Profile;
