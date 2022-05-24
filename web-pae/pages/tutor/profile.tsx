import ToggleMenu from '@/components/toggle-menu';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import CardInformation from '../../components/card-information';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/tutor/profile.module.css';

const Profile: NextPage = () => (
  <div>
    <ToggleMenu />
    <h1>PROFILE</h1>
    <div className={Styles.cardInfo}>
      <CardInformation />
    </div>
  </div>
);

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};
export default Profile;
